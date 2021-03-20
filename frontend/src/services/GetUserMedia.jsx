const getUserMediaFail = (constraints, resolve, reject) => {
    reject(
        new Error(
            "No API to retrieve media stream. This can happen if you are using an old browser, or the application is not using HTTPS"
        )
    );
};

export const getUserMedia = (constraints) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    const _getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        getUserMediaFail;

    return new Promise((resolve, reject) => {
        _getUserMedia.call(navigator, constraints, resolve, reject);
    });
};
