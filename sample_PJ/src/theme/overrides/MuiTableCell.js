import palette from '../palette';
import typography from '../typography';

export default {
  root: {
    ...typography.body1,
    // fontFamily: `"Gotham A","Gotham B",'Noto Sans KR',sans-serif`,
    borderBottom: `1px solid ${palette.divider}`
  }
};
