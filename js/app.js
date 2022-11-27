function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');
        }
        if (slider.classList.contains('_gallery')) {
            //slider.data('lightGallery').destroy(true);
        }
    }
    sliders_bild_callback();
}

function sliders_bild_callback(params) { }

if (document.querySelector('.intro-slider__body')) {
	new Swiper('.intro-slider__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,		
		speed: 800,
		loop: true,
		autoHeight: true,
		//preloadImages: false,
		//parallax: true,
		// Dotts		
		// Arrows
		navigation: {
			nextEl: '.intro-slider .intro-slider__arrow_next',
			prevEl: '.intro-slider .intro-slider__arrow_prev',
		}
	});
}

if (document.querySelector('.slider-project__body')) {
	new Swiper('.slider-project__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 0,		
		speed: 800,
		loop: true,
		autoHeight: true,
		//preloadImages: false,
		//parallax: true,
		// Dotts		
		// Arrows
		navigation: {
			nextEl: '.slider-project .slider-project__arrow_next',
			prevEl: '.slider-project .slider-project__arrow_prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,				
			},
			400: {
				slidesPerView: 2,				
			},
			800: {
				slidesPerView: 3,				
			},			
			1085: {
				slidesPerView: 4,				
			},
		},
	});
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=======================================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
// LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index];
		let txt = el.innerHTML;
		let txt_words = txt.replace('  ', ' ').split(' ');
		let new_title = '';
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index];
			let len = txt_word.length;
			new_title = new_title + '<p>';
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1);
				if (it == ' ') {
					it = '&nbsp;';
				}
				new_title = new_title + '<span>' + it + '</span>';
			}
			el.innerHTML = new_title;
			new_title = new_title + '&nbsp;</p>';
		}
	}
}
//=================
//SearchInList
function search_in_list(input) {
	let ul = input.parentNode.querySelector('ul')
	let li = ul.querySelectorAll('li');
	let filter = input.value.toUpperCase();

	for (i = 0; i < li.length; i++) {
		let el = li[i];
		let item = el;
		txtValue = item.textContent || item.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			el.style.display = "";
		} else {
			el.style.display = "none";
		}
	}
}
//=================
//DigiFormat
function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
}
//=================
//DiGiAnimate
function digi_animate(digi_animate) {
	if (digi_animate.length > 0) {
		for (let index = 0; index < digi_animate.length; index++) {
			const el = digi_animate[index];
			const el_to = parseInt(el.innerHTML.replace(' ', ''));
			if (!el.classList.contains('_done')) {
				digi_animate_value(el, 0, el_to, 1500);
			}
		}
	}
}
function digi_animate_value(el, start, end, duration) {
	var obj = el;
	var range = end - start;
	// no timer shorter than 50ms (not really visible any way)
	var minTimer = 50;
	// calc step time to show all interediate values
	var stepTime = Math.abs(Math.floor(duration / range));

	// never go below minTimer
	stepTime = Math.max(stepTime, minTimer);

	// get current time and calculate desired end time
	var startTime = new Date().getTime();
	var endTime = startTime + duration;
	var timer;

	function run() {
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - (remaining * range));
		obj.innerHTML = digi(value);
		if (value == end) {
			clearInterval(timer);
		}
	}

	timer = setInterval(run, stepTime);
	run();

	el.classList.add('_done');
}
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//===================================================
/*
Документация по работе в шаблоне:
data-showmore="size/items"
data-showmore-content="размер/кол-во"
data-showmore-button="скорость"
Сниппет (HTML): showmore
*/
const showMoreBlocks = document.querySelectorAll('[data-showmore]');
if (showMoreBlocks.length) {
	initItems(showMoreBlocks);
	document.addEventListener("click", showMoreActions);
	window.addEventListener("resize", showMoreActions);
}
function initItems(showMoreBlocks) {
	showMoreBlocks.forEach(showMoreBlock => {
		initItem(showMoreBlock);
	});
}
function initItem(showMoreBlock) {
	const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
	const showMoreButton = showMoreBlock.querySelector('[data-showmore-button]');
	const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
	if (hiddenHeight < getOriginalHeight(showMoreContent)) {
		_slideUp(showMoreContent, 0, hiddenHeight);
		showMoreButton.hidden = false;
	}
}
function getHeight(showMoreBlock, showMoreContent) {
	let hiddenHeight = 0;
	const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
	if (showMoreType === 'items') {
		const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
		const showMoreItems = showMoreContent.children;
		for (let index = 1; index < showMoreItems.length; index++) {
			const showMoreItem = showMoreItems[index - 1];
			hiddenHeight += showMoreItem.offsetHeight;
			if (index === showMoreTypeValue) break;
		}
	} else {
		const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
		hiddenHeight = showMoreTypeValue;
	}
	return hiddenHeight;
}
function getOriginalHeight(showMoreContent) {
	let hiddenHeight = showMoreContent.offsetHeight;
	showMoreContent.style.removeProperty('height');
	let originalHeight = showMoreContent.offsetHeight;
	showMoreContent.style.height = `${hiddenHeight}px`;
	return originalHeight;
}
function showMoreActions(e) {
	const targetEvent = e.target;
	const targetType = e.type;
	if (targetType === 'click') {
		if (targetEvent.closest('[data-showmore-button]')) {
			const showMoreButton = targetEvent.closest('[data-showmore-button]');
			const showMoreBlock = showMoreButton.closest('[data-showmore]');
			const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
			const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
			const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
			if (!showMoreContent.classList.contains('_slide')) {
				showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
				showMoreBlock.classList.toggle('_showmore-active');
			}
		}
	} else if (targetType === 'resize') {
		initItems(showMoreBlocks);
	}
}

// Модуль "показать еще" =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне:
data-showmore-media = "768,min"
data-showmore="size/items"
data-showmore-content="размер/кол-во"
data-showmore-button="скорость"
Сниппет (HTML): showmore


	window.addEventListener("load", function (e) {
		const showMoreBlocks = document.querySelectorAll('[data-showmore]');
		let showMoreBlocksRegular;
		let mdQueriesArray;
		if (showMoreBlocks.length) {
			// Получение обычных объектов
			showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
				return !item.dataset.showmoreMedia;
			});
			// Инициализация обычных объектов
			showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

			document.addEventListener("click", showMoreActions);
			window.addEventListener("resize", showMoreActions);

			// Получение объектов с медиа запросами
			mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
			if (mdQueriesArray && mdQueriesArray.length) {
				mdQueriesArray.forEach(mdQueriesItem => {
					// Событие
					mdQueriesItem.matchMedia.addEventListener("change", function () {
						initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
					});
				});
				initItemsMedia(mdQueriesArray);
			}
		}
		function initItemsMedia(mdQueriesArray) {
			mdQueriesArray.forEach(mdQueriesItem => {
				initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
		function initItems(showMoreBlocks, matchMedia) {
			showMoreBlocks.forEach(showMoreBlock => {
				initItem(showMoreBlock, matchMedia);
			});
		}
		function initItem(showMoreBlock, matchMedia = false) {
			showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
			let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
			let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
			showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
			if (matchMedia.matches || !matchMedia) {
				if (hiddenHeight < getOriginalHeight(showMoreContent)) {
					_slideUp(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = false;
				} else {
					_slideDown(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = true;
				}
			} else {
				_slideDown(showMoreContent, 0, hiddenHeight);
				showMoreButton.hidden = true;
			}
		}
		function getHeight(showMoreBlock, showMoreContent) {
			let hiddenHeight = 0;
			const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
			if (showMoreType === 'items') {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
				const showMoreItems = showMoreContent.children;
				for (let index = 1; index < showMoreItems.length; index++) {
					const showMoreItem = showMoreItems[index - 1];
					hiddenHeight += showMoreItem.offsetHeight;
					if (index == showMoreTypeValue) break
				}
			} else {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
				hiddenHeight = showMoreTypeValue;
			}
			return hiddenHeight;
		}
		function getOriginalHeight(showMoreContent) {
			let parentHidden;
			let hiddenHeight = showMoreContent.offsetHeight;
			showMoreContent.style.removeProperty('height');
			if (showMoreContent.closest(`[hidden]`)) {
				parentHidden = showMoreContent.closest(`[hidden]`);
				parentHidden.hidden = false;
			}
			let originalHeight = showMoreContent.offsetHeight;
			parentHidden ? parentHidden.hidden = true : null;
			showMoreContent.style.height = `${hiddenHeight}px`;
			return originalHeight;
		}
		function showMoreActions(e) {
			const targetEvent = e.target;
			const targetType = e.type;
			if (targetType === 'click') {
				if (targetEvent.closest('[data-showmore-button]')) {
					const showMoreButton = targetEvent.closest('[data-showmore-button]');
					const showMoreBlock = showMoreButton.closest('[data-showmore]');
					const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
					const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
					const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
					if (!showMoreContent.classList.contains('_slide')) {
						showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
						showMoreBlock.classList.toggle('_showmore-active');
					}
				}
			} else if (targetType === 'resize') {
				showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
				mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
			}
		}
	});
	*/


window.onload = function () {
	document.addEventListener("click", documentActions);

	// Actions (делегирование события click)
	function documentActions(e) {
		const targetElement = e.target;		
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}		
		if (targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			e.preventDefault();
		}
		if (targetElement.classList.contains('hover-product__button')) {
			const productId = targetElement.closest('.item-product').dataset.pid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}

		if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-header').classList.toggle('_active');
			}
			e.preventDefault();
		} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('hover-product__button')) {
			document.querySelector('.cart-header').classList.remove('_active');
		}

		if (targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}

	}	

	// Load More Products
	async function getProducts(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			const file = "json/products.json";
			let response = await fetch(file, {
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadProducts(result);
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert("Ошибка");
			}
		}
	}

	function loadProducts(data) {
		const productsItems = document.querySelector('.products__items');

		data.products.forEach(item => {
			const productId = item.id;
			const productUrl = item.url;
			const productImage = item.image;
			const productTitle = item.title;
			const productText = item.text;
			const productPrice = item.price;
			const productOldPrice = item.priceOld;
			const productSearchUrl = item.searchUrl;
			const productHeartUrl = item.heartUrl;
			const productLabels = item.labels;

			let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = '';
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				productLabels.forEach(labelItem => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}"><span>${labelItem.value}</span></div>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
		<a href="${productUrl}" class="item-product__image-ibg">
			<img src="img/products/${productImage}" alt="${productTitle}">
		</a>
	`;

		let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTemplateContent = `
		<div class="item-product__content">
			<h5 class="item-product__title">${productTitle}</h5>
			<div class="item-product__text">${productText}</div>
		</div>	
	`;	
	
			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">${productPrice}</div>`;
			let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
		<div class="item-product__hover hover-product">
			<div class="hover-product__btn">
				<a href="${productSearchUrl}" class="hover-product__icon _icon-search"></a>
				<a href="" class="hover-product__button _icon-cart"></a>
				<a href="${productHeartUrl}" class="hover-product__icon _icon-heart"></a>
			</div>
		</div>
	`;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;
			
			productsItems.insertAdjacentHTML('beforeend', productTemplate);

		});

	}

	// AddToCart
	function addToCart(productButton, productId) {
		if (!productButton.classList.contains('_hold')) {
			productButton.classList.add('_hold');
			productButton.classList.add('_fly');

			const cart = document.querySelector('.cart-header__icon');
			const product = document.querySelector(`[data-pid="${productId}"]`);
			const productImage = product.querySelector('.item-product__image-ibg');

			const productImageFly = productImage.cloneNode(true);

			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;

			productImageFly.setAttribute('class', '_flyImage');
			productImageFly.style.cssText =
				`
			left: ${productImageFlyLeft}px;
			top: ${productImageFlyTop}px;
			width: ${productImageFlyWidth}px;
			height: ${productImageFlyHeight}px;
		`;

			document.body.append(productImageFly);

			const cartFlyLeft = cart.getBoundingClientRect().left;
			const cartFlyTop = cart.getBoundingClientRect().top;

			productImageFly.style.cssText =
				`
			left: ${cartFlyLeft}px;
			top: ${cartFlyTop}px;
			width: 0px;
			height: 0px;
			opacity:0;
		`;

			productImageFly.addEventListener('transitionend', function () {
				if (productButton.classList.contains('_fly')) {
					productImageFly.remove();
					updateCart(productButton, productId);
					productButton.classList.remove('_fly');
				}
			});
		}
	}

	function updateCart(productButton, productId, productAdd = true) {
		const cart = document.querySelector('.cart-header');
		const cartIcon = cart.querySelector('.cart-header__icon');
		const cartQuantity = cartIcon.querySelector('span');
		const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		const cartList = document.querySelector('.cart-list');

		//Добавляем
		if (productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
			}
			if (!cartProduct) {
				const product = document.querySelector(`[data-pid="${productId}"]`);
				const cartProductImage = product.querySelector('.item-product__image-ibg').innerHTML;
				const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
				const cartProductContent = `
			<div class="cart-list__image-ibg">${cartProductImage}</div>
			<div class="cart-list__body">
				<a href="" class="cart-list__title">${cartProductTitle}</a>
				<div class="cart-list__quantity">Quantity: <span>1</span></div>
				<a href="" class="cart-list__delete">Delete</a>
			</div>`;
				cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
			} else {
				const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			}

			// После всех действий
			productButton.classList.remove('_hold');
		} else {
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
				cartProduct.remove();
			}

			const cartQuantityValue = --cartQuantity.innerHTML;

			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove('_active');
			}
		}
	}
}	
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open(message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		// If test
		if (form.hasAttribute('data-test')) {
			e.preventDefault();
			popup_open(message + '-message');
			form_clean(form);
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}


//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass" && !input.parentElement.querySelector('.form__viewpass').classList.contains('_active')) {
					input.setAttribute('type', 'password');
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+375 (99) 9999999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}


