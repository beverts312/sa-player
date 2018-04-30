export class MockProcess {
    private onClose: Function;

    public on(event: string, listener: Function) {
        if (event === 'close') {
            this.onClose = listener;
        }
    }

    public close() {
        this.onClose();
    }
}