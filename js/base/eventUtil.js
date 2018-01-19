const __ = {
    x: Symbol('x'),
    y: Symbol('y'),
    onTap: Symbol('onTap'),
    onSwipe: Symbol('onSwipe'),
}
const SWIPEGAP = 40
const TYPE_TAP = 'tap'
const TYPE_SWIPE = 'swipe'

export default class EventUtil {
    constructor(onTap = function () {}, onSwipe = function () {}) {
        this[__.x] = 0;
        this[__.y] = 0;
        this[__.onTap] = onTap;
        this[__.onSwipe] = onSwipe;
        this.initEvent()
    }


    initEvent() {
        canvas.addEventListener('touchstart', ((e) => {
            e.preventDefault()

            this[__.x] = e.changedTouches[0].clientX
            this[__.y] = e.changedTouches[0].clientY
        }).bind(this))

        canvas.addEventListener('touchend', ((e) => {
            e.preventDefault()

            let deltaX = e.changedTouches[0].clientX - this[__.x]
            let deltaY = e.changedTouches[0].clientY - this[__.y]

            if (deltaX * deltaX + deltaY * deltaY < SWIPEGAP * SWIPEGAP) {
                return this.fireEvent(TYPE_TAP)
            }
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    return this.fireEvent(TYPE_SWIPE, 'right')
                } else {
                    return this.fireEvent(TYPE_SWIPE, 'left')
                }
            } else {
                if (deltaY > 0) {
                    return this.fireEvent(TYPE_SWIPE, 'down')
                } else {
                    return this.fireEvent(TYPE_SWIPE, 'up')
                }
            }

        }).bind(this))
    }
    fireEvent(type, direction) {
        var event = {}
        event.x = this[__.x]
        event.y = this[__.y]
        if (direction) {
            event.direction = direction
        }
        switch (type) {
            case TYPE_TAP:
                return this[__.onTap](event)
            case TYPE_SWIPE:
                return this[__.onSwipe](event)
            default:
                break;
        }
    }
}