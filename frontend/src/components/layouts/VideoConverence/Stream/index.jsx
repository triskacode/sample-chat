import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import SimplePeer from "simple-peer";
import {
    GlobalContext,
    RTCContext,
    rtcStateType,
    SocketContext,
} from "../../../../context";
import { getUserMedia } from "../../../../services";
import { Dropdown } from "../../../commons";
import "./index.css";

const CameraButtonDropdown = ({ trigger, ...rest }) => {
    return (
        <div
            className={`flex-none w-12 h-12 rounded-full transition duration-200 ease-in-out transform hover:scale-125 hover:shadow hover:bg-gray-100 dark:hover:bg-gray-700 ${
                trigger ? "bg-gray-100 shadow dark:bg-gray-700 scale-125" : ""
            }`}
        >
            <button
                {...rest}
                className="w-full h-full flex justify-center rounded-l-md items-center appearance-none focus:outline-none cursor-pointer"
            >
                <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </button>
        </div>
    );
};

const CameraContentDropdown = ({
    videoSourceList,
    videoSource,
    setVideoSource,
}) => {
    const handleClick = (event, deviceId) => {
        setVideoSource(deviceId);
    };

    return (
        <>
            {videoSourceList.map((device, index) => {
                return (
                    <a
                        key={device.deviceId}
                        onClick={(event) => handleClick(event, device.deviceId)}
                        className={`block cursor-pointer w-full px-4 py-2 hover:text-gray-100 hover:font-semibold hover:bg-violet-700 dark:hover:bg-violet-500 ${
                            videoSource === device.deviceId
                                ? "font-semibold"
                                : ""
                        }`}
                    >
                        {device.label || `speaker ${index + 1}`}
                    </a>
                );
            })}
        </>
    );
};

const MicrophoneButtonDropdown = ({ trigger, ...rest }) => {
    return (
        <div
            className={`flex-none w-12 h-12 rounded-full transition duration-200 ease-in-out transform hover:scale-125 hover:shadow hover:bg-gray-100 dark:hover:bg-gray-700 ${
                trigger ? "bg-gray-100 shadow dark:bg-gray-700 scale-125" : ""
            }`}
        >
            <button
                {...rest}
                className="w-full h-full flex justify-center rounded-l-md items-center appearance-none focus:outline-none cursor-pointer"
            >
                <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                </svg>
            </button>
        </div>
    );
};

const MicrophoneContentDropdown = ({
    audioSourceList,
    audioSource,
    setAudioSource,
}) => {
    const handleClick = (event, deviceId) => {
        setAudioSource(deviceId);
    };

    return (
        <>
            {audioSourceList.map((device, index) => {
                return (
                    <a
                        key={device.deviceId}
                        onClick={(event) => handleClick(event, device.deviceId)}
                        className={`block cursor-pointer w-full px-4 py-2 hover:text-gray-100 hover:font-semibold hover:bg-violet-700 dark:hover:bg-violet-500 ${
                            audioSource === device.deviceId
                                ? "font-semibold"
                                : ""
                        }`}
                    >
                        {device.label || `speaker ${index + 1}`}
                    </a>
                );
            })}
        </>
    );
};

export const Stream = () => {
    const { dispatch: dispatchGlobal } = useContext(GlobalContext);
    const { rtc, dispatch: dispatchRTC } = useContext(RTCContext);
    const socket = useContext(SocketContext);
    const { _id: otherUserId } = useParams();
    const history = useHistory();
    const video = useRef();
    const otherVideo = useRef();
    const location = useLocation();
    const [stream, setStream] = useState();
    const [audioSourceList, setAudioSourceList] = useState([]);
    const [videoSourceList, setVideoSourceList] = useState([]);
    const [audioSource, setAudioSource] = useState("");
    const [videoSource, setVideoSource] = useState("");
    const [peer, setPeer] = useState(
        new SimplePeer({ initiator: true, trickle: true })
    );
    const [otherPeer, setOtherPeer] = useState(
        new SimplePeer({ initiator: false, trickle: true })
    );

    const handleSignalEvent = ({ initiator, data }) => {
        if (initiator === true) otherPeer.signal(data);
        else if (initiator === false) peer.signal(data);
    };
    const handleSignalPeer = (params) => {
        socket.emit("signal", { to: otherUserId, ...params }, (error) => {
            console.log(error);
            dispatchGlobal({ type: "set_error", payload: error });
        });
    };
    const handleStreamPeer = (stream) => {
        if ("srcObject" in otherVideo.current) {
            otherVideo.current.srcObject = stream;
        } else {
            otherVideo.current.src = window.URL.createObjectURL(stream);
        }
    };

    useEffect(() => {
        socket.on("signal", handleSignalEvent);
        peer.on("signal", (data) =>
            handleSignalPeer({ initiator: true, data })
        );
        otherPeer.on("signal", (data) =>
            handleSignalPeer({ initiator: false, data })
        );

        otherPeer.on("stream", handleStreamPeer);

        return () => {
            socket.off("signal", handleSignalEvent);
            peer.off("signal", (data) =>
                handleSignalPeer({ initiator: true, data })
            );
            otherPeer.off("signal", (data) =>
                handleSignalPeer({ initiator: false, data })
            );

            otherPeer.off("stream", handleStreamPeer);
        };
    }, [peer, otherPeer]);

    useEffect(() => {
        if (peer !== undefined && stream !== undefined) peer.addStream(stream);

        return () => {
            if (stream !== undefined) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [stream, peer]);

    useEffect(() => {
        const handleCloseRTCEvent = ({ message }) => {
            console.log(message);
            alert(message);
            dispatchRTC({ type: "reset" });

            history.push("/dashboard/conversations");
        };
        const handleConstraintsEvent = ({ constraints }) => {
            dispatchRTC({
                type: "set_other_constraints",
                payload: constraints,
            });
        };
        socket.on("close rtc", handleCloseRTCEvent);
        socket.on("constraints", handleConstraintsEvent);
        return () => {
            socket.off("close rtc", handleCloseRTCEvent);
            socket.off("constraints", handleConstraintsEvent);
        };
    }, [rtc]);

    useEffect(() => {
        const constraints = {
            audio: {
                deviceId: audioSource ? { exact: audioSource } : undefined,
            },
            video: {
                deviceId: videoSource ? { exact: videoSource } : undefined,
            },
        };

        socket.emit(
            "constraints",
            { to: otherUserId, constraints },
            (error) => {
                console.log(error);
                dispatchGlobal({ type: "set_error", payload: error });
            }
        );

        getUserMedia(constraints)
            .then(gotStream)
            .then(gotDevices)
            .catch((error) => {
                alert(error.message);
            });
    }, [audioSource, videoSource]);

    const gotStream = (stream) => {
        if ("srcObject" in video.current) {
            video.current.srcObject = stream;
        } else {
            video.current.src = window.URL.createObjectURL(stream);
        }

        setStream(stream);

        return navigator.mediaDevices.enumerateDevices();
    };

    const gotDevices = (devices) => {
        let audioSourceList = [];
        let videoSourceList = [];

        devices.forEach((device) => {
            if (device.kind === "audioinput") {
                audioSourceList = [...audioSourceList, device];
            } else if (device.kind === "videoinput") {
                videoSourceList = [...videoSourceList, device];
            }
        });

        if (audioSourceList.length > 0 && audioSource === "") {
            setAudioSource(audioSourceList[0].deviceId);
        }

        if (videoSourceList.length > 0 && videoSource === "") {
            setVideoSource(videoSourceList[0].deviceId);
        }

        setAudioSourceList(audioSourceList);
        setVideoSourceList(videoSourceList);
    };

    const closeStream = () => {
        socket.emit(
            "close rtc",
            { to: otherUserId, message: "stream closed" },
            (error) => {
                console.log(error);
                dispatchGlobal({ type: "set_error", payload: error });
            }
        );

        dispatchRTC({ type: "reset" });
    };

    const handleCloseStream = () => {
        closeStream();

        history.push("/dashboard/conversations");
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (rtc.state !== rtcStateType.free) {
                closeStream();
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            if (rtc.state !== rtcStateType.free) {
                closeStream();
            }

            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [location]);

    return (
        <>
            <video
                ref={otherVideo}
                autoPlay
                className="absolute z-10 inset-0 w-full h-full"
            ></video>
            <video
                ref={video}
                autoPlay
                className="absolute rounded-md z-20 top-2 sm:top-4 right-3 sm:right-6 w-32 sm:w-40"
            ></video>
            <div className="absolute z-30 top-0 bottom-0 right-0 left-0 py-16 flex flex-col justify-end items-center">
                <div className="flex justify-center items-center space-x-12 text-violet-700 dark:text-violet-500">
                    <Dropdown
                        position="tl"
                        button={CameraButtonDropdown}
                        content={() => (
                            <CameraContentDropdown
                                videoSourceList={videoSourceList}
                                videoSource={videoSource}
                                setVideoSource={setVideoSource}
                            ></CameraContentDropdown>
                        )}
                    ></Dropdown>
                    <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-br from-violet-700 to-fuchsia-700 text-gray-100 shadow transition duration-200 ease-in-out transform hover:scale-125">
                        <button
                            onClick={handleCloseStream}
                            className="w-full h-full flex justify-center rounded-l-md items-center appearance-none focus:outline-none cursor-pointer"
                        >
                            <svg
                                className="w-8 h-8"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                                />
                            </svg>
                        </button>
                    </div>
                    <Dropdown
                        position="tr"
                        button={MicrophoneButtonDropdown}
                        content={() => (
                            <MicrophoneContentDropdown
                                audioSourceList={audioSourceList}
                                audioSource={audioSource}
                                setAudioSource={setAudioSource}
                            ></MicrophoneContentDropdown>
                        )}
                    ></Dropdown>
                </div>
            </div>
        </>
    );
};
