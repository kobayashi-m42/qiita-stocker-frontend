import { QiitaAPI } from "@/api/qiita";

export interface IIssueAccessTokensRequest {
  client_id: string;
  client_secret: string;
  code: string;
}

export interface IIssueAccessTokensResponse {
  client_id: string;
  scopes: string[];
  token: string;
}

export const requestToAuthorizationServer = (clientId: string) => {
  location.href = `http://qiita.com/api/v2/oauth/authorize?client_id=${clientId}&scope=read_qiita`;
};

export const issueAccessToken = async (
  request: IIssueAccessTokensRequest
): Promise<IIssueAccessTokensResponse> => {
  return await QiitaAPI.issueAccessToken(request);
};