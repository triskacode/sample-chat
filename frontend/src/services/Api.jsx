import axios from "axios";

axios.interceptors.response.use(
    ({ data: response }) => response,
    ({ response }) => {
        return Promise.reject(response);
    }
);

const CancelToken = axios.CancelToken;

const createCancelToken = (apiObject) => {
    const cancelToken = {};

    Object.getOwnPropertyNames(apiObject).forEach((property) => {
        cancelToken[property] = {
            cancelToken: undefined,
            request() {
                if (this.cancelToken) {
                    this.cancelToken.cancel(`${property} canceled.`);
                }

                this.cancelToken = CancelToken.source();
                return this.cancelToken;
            },
        };
    });

    return cancelToken;
};

export const UserApi = {
    detail() {
        return axios.post(
            "/api/user-detail",
            {},
            {
                cancelToken: UserApiCancelToken[this.detail.name].request()
                    .token,
            }
        );
    },
    detailLogin(query) {
        return axios.post("/api/user-detail-login", query, {
            cancelToken: UserApiCancelToken[this.detailLogin.name].request().token,
        });
    },
    find(query) {
        return axios.post("/api/user-find", query, {
            cancelToken: UserApiCancelToken[this.find.name].request().token,
        });
    },
    search(query) {
        return axios.post("/api/user-search", query, {
            cancelToken: UserApiCancelToken[this.search.name].request().token,
        });
    },
    pushChat(query) {
        return axios.post("/api/user-push-chat", query, {
            cancelToken: UserApiCancelToken[this.pushChat.name].request().token,
        });
    },
    pullChat(query) {
        return axios.post("/api/user-pull-chat", query, {
            cancelToken: UserApiCancelToken[this.pullChat.name].request().token,
        });
    },
    clearMessage(query) {
        return axios.post("/api/user-clear-message", query, {
            cancelToken: UserApiCancelToken[this.clearMessage.name].request().token,
        });
    },
};
export const UserApiCancelToken = createCancelToken(UserApi);
