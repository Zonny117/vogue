// 보그코리아 메인 페이지 JS - main.js

// 모바일 여부를 체크하는 변수에 코드 발급하기
// mob 값이 0이면 dt, 1이면 모바일
let mob = 0;

let chksz = () => {
    if ($(window).width() <= 500) mob = 1;
    else mob = 0;
    console.log("모바일여부:" + mob);
}; ////////////

chksz();


// 화면의 크기가 변경될때 / 모바일 오리엔테이션 변경(방향변경)시
// resize() 메서드 - 화면 크기가 변할때 사용
$(window).resize(chksz);

$(function () {

    // 햄버거 버튼을 클릭하면 전체메뉴 보이기
    // 대상: .hbtn
    // 이벤트 종류: click
    // 변경 대상: .mobx
    // 변경 내용: 슬라이드 되면서 보이기/숨기기(토글)

    let hv = "100vh";

    let ov = "auto"; // 내용 넘치면 스크롤 생성

    $(".hbtn").click(function () {
        // console.log("보여줘");

        //1. 변경대상을 슬라이드 다운/업
        $("#mobx").slideToggle(300, "easeOutQuint");

        //2. #top 전체 박스에 스크롤 생기거나 숨기기
        $("#top").css({
            height: hv,
            overflow: ov
        }); // 최초엔 "100vh" 값 들어감

        //두가지 값이 전환되도록 값 변경하기
        hv === "100vh" ? hv = "auto" : hv = "100vh";
        ov === "auto" ? ov = "visible" : ov = "auto";
        // 삼항(조건) 연산자
    }); /////////////////////////////////

    // 검색 버튼을 클릭하면 검색창 보이기
    // 대상: .sbtn
    // 이벤트 종류: click
    // 변경 대상: .mos
    // 변경 내용: 슬라이드 되면서 보이기/숨기기(토글)

    $(".sbtn").click(function () {

        // console.log("검색해");

        // 1. 변경대상 슬라이드 보이기 숨기기
        $(".mos").stop().slideToggle(300, "easeOutQuint");

    }); ////////////////////////////

    // 스크롤 액션 대상 변수
    // 위로가기 버튼
    let tbtn = $(".tbtn");
    // 위로가기 버튼 등장액션 상태변수
    let tsts = 0; //0-액션전 1-액션후
    // 상단영역 
    let tbx = $("#top");
    // GNB 박스 위치값
    let gnbpos = $(".gnb").offset().top;
    console.log("GNB위치값:" + gnbpos)
    // 상단영역 클래스 적용여부 상태변수
    let gnbsts = 0; //0-액션전 1-액션후


    ////////////////////////////////////////////////////
    //스크롤 액션
    // 종류 scroll
    // 대상 window(전체스크롤)
    // 사용 메서드 scroll()
    $(window).scroll(function () {

        //1. 스크롤바 위치값
        let scTop = $(this).scrollTop();
        // console.log("스크롤 위치: " + scTop);

        //2-1. 위로 이동 버튼 처리
        if (scTop > 300 && tsts === 0) {
            tsts = 1; //상태값 변경(한번만 실행)
            // console.log("나야나");
            tbtn.fadeIn(300);
        } /////////////////
        else if (scTop <= 300 && tsts === 1) {
            tsts = 0; //
            // console.log("너야너")
            tbtn.fadeOut(300);
        } /////////////////////

        //2-2. 상단메뉴 
        // 모바일 아닐때만 실행
        // .gnb 메뉴 top 위치값을 기준하여 #top에 .on 클래스 적용
        if (scTop >= gnbpos && gnbsts === 0 && mob === 0) {
            gnbsts = 1;
            // console.log("바꿔")

            // 상단 영역 클래스 넣기
            tbx.addClass("on");

        } /////////////////////// 
        else if (scTop < gnbpos && gnbsts === 1 && mob === 0) {
            gnbsts = 0;
            // console.log("안바꿔")

            // 상단 영역 클래스 빼기
            tbx.removeClass("on");
        } ///////////////////////////


    }); ////////////////////////

    // 탑버튼 클릭시 페이지 상단 이동 애니메이션
    tbtn.click(function (e) {

        // a태그 이동 막기
        e.preventDefault();


        // 스크롤 애니메이션을 자연스럽게 처리
        tbx.removeClass("on");

        // 스크롤 애니메이션
        $("html,body").animate({
            scrollTop: "0"
        }, 600, "easeOutCubic");
    });


    // 모바일일때 화면전환(가로/세로)시 상단영역 #top에 클래스 넣기/빼기
    $(window).resize(function () {

        if (mob) { // 모바일 세로 (500px 이하)
            tbx.removeClass("on");
        } ////////////

    }); ///////////////////////////

}); ////////////////////////////jqb