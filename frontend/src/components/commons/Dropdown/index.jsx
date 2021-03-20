import React, { useEffect, useRef, useState } from "react";

export const Dropdown = ({
    background,
    position,
    button: ButtonDropdown,
    content: ContentDropdown,
}) => {
    const container = useRef();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleClick = (event) => {
            if (!container.current?.contains(event.target)) {
                if (!show) return;
                setShow(false);
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [show, container]);

    const handlePosition = (position) => {
        switch (position) {
            case "tl":
                return "right-0 bottom-full mb-4";
            case "tr":
                return "left-0 bottom-full mb-4";
            case "bl":
                return "right-0 top-full mt-4";
            case "br":
                return "left-0 top-full mt-4";
            default:
                return "right-0 top-full mt-4";
        }
    };

    return (
        <div ref={container} className="relative">
            <ButtonDropdown
                onClick={() => setShow(!show)}
                trigger={show}
            ></ButtonDropdown>
            <div
                className={
                    show
                        ? `absolute z-20 flex w-48 flex-col justify-center items-start shadow-md rounded-md py-2 overflow-hidden text-gray-500 dark:text-gray-400 ${
                              background
                                  ? background
                                  : "bg-gray-100 dark:bg-gray-600"
                          } ${handlePosition(position)}`
                        : "hidden"
                }
            >
                <ContentDropdown></ContentDropdown>
            </div>
        </div>
    );
};
