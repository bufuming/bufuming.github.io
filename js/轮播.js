$(document).ready(function() {
    // 轮播图功能
    const $slider = $('.banner-slider');
    const $slides = $('.slide');
    const $dotsContainer = $('.slider-dots');
    let currentIndex = 0;
    let slideCount = $slides.length;
    let autoSlideInterval;
    
    // 创建指示点
    for (let i = 0; i < slideCount; i++) {
        $dotsContainer.append('<div class="dot" data-index="' + i + '"></div>');
    }
    
    const $dots = $('.dot');
    
    // 显示指定幻灯片
    function showSlide(index) {
        // 边界检查
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;
        
        // 更新位置
        $slider.css('transform', 'translateX(-' + (index * 100) + '%)');
        
        // 更新激活点
        $dots.removeClass('active');
        $dots.eq(index).addClass('active');
        
        currentIndex = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // 自动轮播
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // 事件绑定
    $('.next-btn').click(function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    $('.prev-btn').click(function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    $dots.click(function() {
        stopAutoSlide();
        const index = parseInt($(this).data('index'));
        showSlide(index);
        startAutoSlide();
    });
    
    // 鼠标悬停时暂停轮播
    $('.banner-container').hover(stopAutoSlide, startAutoSlide);
    
    // 初始化
    $dots.first().addClass('active');
    startAutoSlide();
});