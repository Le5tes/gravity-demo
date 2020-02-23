export function cleanStyles() {
    const head = document.querySelector('head');
    const styles = head.querySelectorAll('style');
    for (let i = 0; i < styles.length; i++) {
        head.removeChild(styles[i]);
    }
}
