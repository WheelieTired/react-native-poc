/* global fetch */

import fetch from 'fetch';
import _ from 'lodash';

import * as sessionSelectors from '../session/selectors';
import apiConfig from './config';

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
	const accessToken = sessionSelectors.get().tokens.access.value;
	return fetchival(`${apiConfig.url}${endPoint}`, {
		headers: _.pickBy({
			...(accessToken ? {
				Authorization: `Bearer ${accessToken}`,
			} : {
				'Client-ID': apiConfig.clientId,
			}),
			...headers,
		}, item => !_.isEmpty(item)),
	})[method.toLowerCase()](payload)
	.catch((e) => {
		if (e.response && e.response.json) {
			e.response.json().then((json) => {
				if (json) throw json;
				throw e;
			});
		} else {
			throw e;
		}
	});
};
