(function() {

    "use strict"

    const body = document.querySelector('body');
    const nav = document.querySelector('#nav');
    const navToggle = document.querySelector('a[href="#nav"]');
    const navClose = document.querySelector('#nav .close');

    document.addEventListener('DOMContentLoaded', function() {
        body.classList.remove('is-loading');
    });

    // Hide function
    const hideNav=function(){
        nav.classList.remove('visible');
        body.classList.remove('menu-visible');
    };

    // Event: Prevent clicks/taps inside the nav from bubbling.
    nav.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Event: Hide nav on body click/tap.
    body.addEventListener('click', function(event) {
        hideNav();
    });

    // Toggle nav on click.
    navToggle.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        nav.classList.toggle('visible');
        body.classList.toggle('menu-visible');
    });

    // Hide nav on click.
    navClose.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        hideNav();
    });

    let transition = function(e) {
        let href = this.getAttribute('href');
        let target = this.getAttribute('target');
        if (!href || href.indexOf('#') != -1 || href.indexOf('tel') != -1 || href.indexOf('wa.me') != -1 || href.indexOf('mailto') != -1 || target == '_blank')
            return;
        e.preventDefault();
        e.stopPropagation();
        hideNav();
        body.classList.add('trans');
        window.setTimeout(function() {
            window.location.href = href;
        }, 250);
    }
    
    body.addEventListener('click', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('a')) {
                transition.call(target, e);
                break;
            }
        }
    }, false);

    nav.addEventListener('click', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('a')) {
                transition.call(target, e);
                break;
            }
        }
    }, false);

    // Remove transition class from body if page loaded from bfcache
    window.addEventListener('pageshow', function(event) {
        if (event.persisted === true) {
            body.classList.remove('trans');
        }
    }, false);


    //Modal
    const button_modal_open = document.querySelector('.modal-open');
    if (button_modal_open) {
        button_modal_open.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const modal = document.querySelector('#' + this.getAttribute('data-modal'));
            modal.classList.toggle('show');
        });
    }

    const button_modal_close = document.querySelector('#modal-close-order');
    if (button_modal_close) {
        button_modal_close.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const modal = document.querySelector('#' + this.getAttribute('data-close'));
            modal.classList.toggle('show');
        });
    }

    const modal_order = document.querySelector('#modal-order');
    if (modal_order) {
        window.addEventListener('click', function(event) {
            if (event.target == modal_order) {
                modal_order.classList.toggle('show');
            }
        });
    }

    // Form submission
    const form = document.querySelector('.ajax-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const url = "https://notstupidapp.ew.r.appspot.com/mailapi/copperi"

            const form_loading = this.parentNode.querySelector('.form-loading');
            const form_success = this.parentNode.querySelector('.form-success');
            const form_error = this.parentNode.querySelector('.form-error');

            const payload = {
                name: this.elements["name"].value,
                phone: this.elements["phone"].value,
                email: this.elements["email"].value,
                message: this.elements["message"].value,
                from_page: this.elements["page"].value
            }
            this.classList.add('hide');
            form_loading.classList.remove('hide');
            form_loading.classList.add('fade-in');

            let request = new XMLHttpRequest();
            request.open('POST', url);

            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    console.log('Success');
                    console.log(this.responseText);
                    form_loading.classList.add('hide');
                    form_success.classList.remove('hide');
                    form_success.classList.add('fade-in');
                } else {
                    // We reached our target server, but it returned an error
                    console.log('Server returned error');
                    form_loading.classList.add('hide');
                    form_error.classList.remove('hide');
                    form_error.classList.add('fade-in');
                }
            };
            request.onerror = function() {
                console.log('Connection error');
                form_loading.classList.add('hide');
                form_error.classList.remove('hide');
                form_error.classList.add('fade-in');
            };
            request.send(JSON.stringify(payload));

        }, false);
    }

})();
