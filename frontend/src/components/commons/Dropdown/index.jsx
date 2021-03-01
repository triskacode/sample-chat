import React, { useEffect, useRef, useState } from "react";

export const Dropdown = ({
    background,
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

    return (
        <div ref={container} className="relative">
            <ButtonDropdown
                onClick={() => setShow(!show)}
                trigger={show}
            ></ButtonDropdown>
            <div
                className={
                    show
                        ? `absolute right-0 mt-2 z-20 flex w-48 flex-col justify-center items-start shadow-md rounded-md py-2 overflow-hidden text-gray-500 dark:text-gray-400 ${
                              background
                                  ? background
                                  : "bg-gray-100 dark:bg-gray-600"
                          }`
                        : "hidden"
                }
            >
                <ContentDropdown></ContentDropdown>
            </div>
        </div>
    );
};
