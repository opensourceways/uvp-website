import http from "@/http-common";
class UvpDataService {
  queryVulnerability(data: any): Promise<any> {
    return http({
      url: `/search`,
      method: 'post',
      data
    })
  }
  queryVulnerabilityDetailByVulnId(vulnId: string): Promise<any> {
    return http.get(`/vulnerability/${vulnId}`);
  }
}

export default new UvpDataService();
