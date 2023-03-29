import { ElLoading, ElMessage } from 'element-plus'
import ResponseData from "@/types/ResponseData";
import { ref } from "vue";
import $store from "@/store/index";

export function ParseFileNameFromHeader(response: ResponseData) {
    const contentDispositionArr = response.headers['content-disposition']?.split('attachment;filename=');
    return contentDispositionArr.length == 2 ? contentDispositionArr[1] : "";
}

let loadingInstance: any = null;

export function ShowLoading(loadingText = "") {
    loadingInstance = ElLoading.service({
        fullscreen: true,
        text: loadingText
    });
}
export function ShowFullScreenLoading(loadingText = "") {
    loadingInstance = ElLoading.service({
        fullscreen: true,
        text: loadingText,
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'loading-win'
    });
}

export function HideLoading() {
    // const loadingInstance = ElLoading.service();
    loadingInstance && loadingInstance.close();
}

function parseUrlParams(): URLSearchParams {
    const paramsStr = window.location.hash.split('?');
    if (!paramsStr || paramsStr.length < 2) {
        return new URLSearchParams();
    }
    return new URLSearchParams(paramsStr[1]);
}

export function ParseUrlVulnId(): string {
    const searchParams: URLSearchParams = parseUrlParams()
    const vulnId: string = searchParams.get('vulnId') || '';

    if (vulnId && !(window as any).UVP_VULN_ID) {
        (window as any).UVP_VULN_ID = vulnId;
        return vulnId;
    } else {
        return (window as any).UVP_VULN_ID;
    }
}
