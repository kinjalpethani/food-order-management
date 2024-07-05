import {useEffect} from "react";

const useDynamicAssets = (cssHref, jsSrc) => {
    useEffect(() => {
        // Load CSS
        let link;
        if (cssHref) {
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssHref;
            document.head.appendChild(link);
        }

        // Load JavaScript
        let script;
        if (jsSrc) {
            script = document.createElement('script');
            script.src = jsSrc;
            script.async = true;
            document.body.appendChild(script);
        }

        return () => {
            // Remove CSS
            if (link) {
                document.head.removeChild(link);
            }
            // Remove JavaScript
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, [cssHref, jsSrc]);
};

export default useDynamicAssets;