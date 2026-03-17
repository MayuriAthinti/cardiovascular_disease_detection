    class SmoothScroll {
        constructor() {
            this.ui = {
                el: document.querySelector('.scroll-container'),
                heightEl: null
            };
    
            this.state = {
                scroll: {
                    target: 0,
                    current: 0,
                    ease: 0.095
                },
                bounds: {
                    scrollHeight: 0
                },
                isResizing: false
            };
    
            this.init();
        }
    
        init() {
            this.bindMethods();
            this.setInitialStyles();
            this.setFakeHeight();
            this.addEventListeners();
            this.observeContentChanges();
            this.render();
        }
    
        bindMethods() {
            this.onScroll = this.onScroll.bind(this);
            this.onResize = this.onResize.bind(this);
            this.render = this.render.bind(this);
            this.setFakeHeight = this.setFakeHeight.bind(this);
        }
    
        setInitialStyles() {
            const el = this.ui.el;
            Object.assign(el.style, {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                willChange: 'transform'
            });
            document.body.classList.add('is-smooth-scroll');
        }
    
        setFakeHeight() {
            if (!this.ui.heightEl) {
                this.ui.heightEl = document.createElement('div');
                this.ui.heightEl.classList.add('js-fake-scroll');
                document.body.appendChild(this.ui.heightEl);
            }
    
            const height = this.ui.el.getBoundingClientRect().height;
            this.state.bounds.scrollHeight = height;
            this.ui.heightEl.style.height = `${height}px`;
        }
    
        onScroll() {
            this.state.scroll.target = window.scrollY;
        }
    
        onResize() {
            this.state.isResizing = true;
            this.setFakeHeight();
            this.state.isResizing = false;
        }
    
        render() {
            const { scroll } = this.state;
            scroll.current += (scroll.target - scroll.current) * scroll.ease;
    
            if (Math.abs(scroll.target - scroll.current) < 0.1) {
                scroll.current = scroll.target;
            }
    
            this.ui.el.style.transform = `translate3d(0, ${-scroll.current}px, 0)`;
    
            requestAnimationFrame(this.render);
        }
    
        observeContentChanges() {
            const observer = new MutationObserver(this.setFakeHeight);
            observer.observe(this.ui.el, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            });
        }
    
        addEventListeners() {
            window.addEventListener('scroll', this.onScroll);
            window.addEventListener('resize', this.onResize);
        }
    }
if(window.innerWidth > 765){

    document.addEventListener('DOMContentLoaded', () => {
        const smoothScroll = new SmoothScroll();
    });
}

