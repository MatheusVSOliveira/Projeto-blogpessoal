import { createStore } from "redux";
import { userReducer } from "./user/UserReducer";

const store = createStore(userReducer);

export default store;