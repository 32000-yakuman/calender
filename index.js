"use strict";
/*=====================================================
グローバル変数
=====================================================*/
const currentDate = new Date();
const elmTitle = document.querySelector(".cal_title");
const elmPrev = document.querySelector(".cal_prev");
const elmNext = document.querySelector(".cal_next");
const elmDays = document.querySelector(".cal_days");
/*=====================================================
イベントハンドラ
=====================================================*/
const onPageLoad = () => {
    updateView(currentDate);
};
const onPrev = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateView(currentDate);
};
const onNext = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateView(currentDate);
};
/*=====================================================
イベントリスナー
=====================================================*/
window.addEventListener("load", onPageLoad);
elmPrev.addEventListener("click", onPrev);
elmNext.addEventListener("click", onNext);
/*=====================================================
自作関数
=====================================================*/
// 描画更新
const updateView = ((date) => {
    updateTitle(date);
    updateDays(date);
});
const updateTitle = ((date) => {
    const title = date.getFullYear().toString() + "年" + (date.
        getMonth() + 1).toString().padStart(2, "0") + "月";
    elmTitle.innerHTML = title;
});
const updateDays = ((date) => {
    const dateList = [];
    const classList = [];
    // 当月の日数を求める
    const thisDays = getMonthDays(date);
    // 1日の左側に表示する日数を計算
    const prevDays = getFirstDayOfWeek(date);
    // 前月の末日を求める
    const prevLastDate = getPrevMonthDays(date);
    // 当月の行数(4~6)を計算
    const rows = Math.ceil((thisDays + prevDays) / 7);
    for (let i = 0; i < rows * 7; i++) {
        if (i < prevDays) {
            dateList.push(prevLastDate - prevDays + 1 + i);
            classList.push("cal_day cal_day--prev");
        }
        else if (prevDays <= i && i < prevDays + thisDays) {
            dateList.push(i - prevDays + 1);
            if (i % 7 === 0) {
                classList.push("cal_day cal_day--sun");
            }
            else if (i % 7 === 1) {
                classList.push("cal_day cal_day--sat");
            }
            else {
                classList.push("cal_day");
            }
        }
        else {
            dateList.push(i - (prevDays + thisDays) + 1);
            classList.push("cal_day cal_day--next");
        }
    }
    let html = "";
    for (let i = 0; i < rows * 7; i++) {
        if (i % 7 === 0) {
            html += "<tr>";
        }
        html += '<td class="' + classList.shift() + '">'
            + dateList.shift()?.toString() + "</td>";
        if (i % 7 === 6) {
            html += "<tr>";
        }
    }
    elmDays.innerHTML = html;
});
// 当月の日数を取得 
const getMonthDays = ((date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    lastDay.setMonth(lastDay.getMonth() + 1);
    lastDay.setDate(0);
    const days = lastDay.getDate();
    return days;
});
// ついたちの曜日を取得
const getFirstDayOfWeek = ((date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const day = firstDay.getDate();
    return day;
});
// 前月の日数を取得
const getPrevMonthDays = ((date) => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1);
    const days = getMonthDays(prevMonth);
    return days;
});
