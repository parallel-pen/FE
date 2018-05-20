import fetch from './config';

export default {
  getNode({ nodeId, first }) {
    return fetch.get('/node/content', {
      params: {
        nodeId,
        first,
      },
    });
  },
  createNode({ fatherId, content, desc }) {
    return fetch.post('/node/create', {
      fatherId,
      content,
      desc,
    });
  },
  err(code) {
    switch (code) {
      case 200001:
        return '错误';
      default:
        return `${code} 未知错误`;
    }
  },
};
