import { API_METHODS } from "../../Shared/Constants/index";

export interface ApiCallProps {
    method?: API_METHODS,
    endpoint?: string;
}