"use strict";
const isUndefined = (value) => typeof value === 'undefined';
const isNotUndefined = (value) => !isUndefined(value);
class Canvas {
    element;
    context;
    constructor(element) {
        this.element = element;
        this.context = element.getContext('2d');
    }
    set width(value) {
        this.element.setAttribute('width', `${value}`);
        this.context = this.element.getContext('2d');
    }
    set height(value) {
        this.element.setAttribute('height', `${value}`);
        this.context = this.element.getContext('2d');
    }
    clear({ x, y, width, height, } = {}) {
        if (isNotUndefined(x) &&
            isNotUndefined(y) &&
            isNotUndefined(width) &&
            isNotUndefined(height)) {
            this.context.clearRect(x, y, width, height);
            return;
        }
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }
    build(task) {
        return {
            stroke: ({ color }) => {
                this.context.save();
                this.context.beginPath();
                this.context.strokeStyle = color;
                task();
                this.context.stroke();
                this.context.closePath();
                this.context.restore();
            },
            fill: ({ color }) => {
                this.context.save();
                this.context.beginPath();
                this.context.fillStyle = color;
                task();
                this.context.fill();
                this.context.closePath();
                this.context.restore();
            },
        };
    }
    dot({ x, y, color }) {
        this.rectangle({ x, y, width: 1, height: 1 }).fill({ color });
    }
    rectangle({ x, y, width, height, }) {
        return this.build(() => this.context.rect(x, y, width, height));
    }
}
window.addEventListener('load', () => {
    const canvas = new Canvas(document.querySelector('#canvas'));
    requestAnimationFrame(function callback() {
        requestAnimationFrame(callback);
        canvas.clear();
        canvas.dot({ x: 50, y: 50, color: 'blue' });
        canvas
            .rectangle({ x: 100, y: 100, width: 100, height: 100 })
            .stroke({ color: 'red' });
    });
});
