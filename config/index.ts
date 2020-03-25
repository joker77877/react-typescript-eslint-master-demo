/* global isDev */
const locationUrl: string = window.location.origin;
interface ConfigProps {
    server: string;
}
const config: ConfigProps = {
    server: isDev ? 'http://localhost:4001/' : `${locationUrl}/ctm01pcka-web/`
    // server: isDev ? 'http://10.2.33.19:12345/ctm01pcka-web/' : `${locationUrl  }/ctm01pcka-web/`
    // server: isDev ? 'http://10.2.32.15:8082/ctm01pcka-web/' : locationUrl + '/ctm01pcka-web/'
};
export default config;
