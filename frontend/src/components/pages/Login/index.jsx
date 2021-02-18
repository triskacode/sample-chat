import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context";
import "./index.css";

const Login = () => {
    const {
        global: { darkMode },
        dispatch,
    } = useContext(GlobalContext);

    const toggleDarkMode = () => {
        console.log("dark mode toggled", darkMode);
        return dispatch({ type: "set_dark_mode", payload: !darkMode });
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex-none h-14 w-full flex justify-end items-center">
                <button
                    onClick={toggleDarkMode}
                    className="group w-12 h-12 flex justify-center items-center appearance-none focus:outline-none cursor-pointer"
                >
                    {darkMode ? (
                        <svg
                            className="w-6 h-6 transition duration-200 transform group-hover:scale-125"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6 transition duration-200 transform group-hover:scale-125"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                    )}
                </button>
            </div>

            <div className="relative flex-1 w-full flex flex-col space-y-10 justify-center items-center">
                <div className="flex justify-center items-center space-x-4">
                    <svg
                        className="mx-auto h-12 w-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 35 32"
                    >
                        <path
                            fill="#4f46e5"
                            d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z"
                        />
                        <path
                            fill="#4f46e5"
                            d="M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"
                        />
                    </svg>
                    <h1 className=" text-5xl font-bold text-gray-700 dark:text-gray-300">
                        Heloo
                    </h1>
                </div>
                <div className="flex items-center justify-center shadow-lg rounded-lg bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-12">
                        <div className="">
                            <h2 className="text-center text-3xl font-bold text-gray-700 dark:text-gray-100">
                                Sign in to your account
                            </h2>
                            <div className="mt-6 flex justify-between items-center text-center text-sm text-gray-600 dark:text-gray-300">
                                <hr className="w-full border-gray-400" />
                                <span className="mx-4">With</span>
                                <hr className="w-full border-gray-400" />
                            </div>
                        </div>

                        <Link
                            to="/dashboard"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md rounded-md text-white bg-gradient-to-br from-violet-700 to-indigo-700 focus:outline-none transition duration-200 transform hover:scale-105"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg
                                    className="w-5 h-5"
                                    id="Layer_1"
                                    version="1.1"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g>
                                        <path
                                            d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707   C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321   C6.4099731,6.9193726,8.977478,5,12,5z"
                                            fill="#F44336"
                                        />
                                        <path
                                            d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12   c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458   l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                                            fill="#2196F3"
                                        />
                                        <path
                                            d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511   C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215   C5.1484375,13.6044312,5,12.8204346,5,12z"
                                            fill="#FFC107"
                                        />
                                        <path
                                            d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959   C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834   C14.7412109,18.5588989,13.4284058,19,12,19z"
                                            fill="#00B060"
                                        />
                                        <path
                                            d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24   c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"
                                            opacity="0.1"
                                        />
                                        <polygon
                                            opacity="0.1"
                                            points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25  "
                                        />
                                        <path
                                            d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12   c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
                                            fill="#E6E6E6"
                                        />
                                        <path
                                            d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
                                            fill="#FFFFFF"
                                            opacity="0.2"
                                        />

                                        <path
                                            d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19   c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686   c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979   C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12   c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12   C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z"
                                            fill="url(#SVGID_1_)"
                                        />
                                        <path
                                            d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7   c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5   c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374   l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z"
                                            opacity="0.1"
                                        />
                                        <path
                                            d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122   l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12   c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z"
                                            fill="#FFFFFF"
                                            opacity="0.2"
                                        />
                                    </g>
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                    <g />
                                </svg>
                            </span>
                            Google
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
