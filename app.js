import { initForm } from './form';

import '@fontsource/roboto';
import './styles.scss';

const init = () => {
    initForm();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
