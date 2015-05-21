/**
 * Created by codyboppert on 4/23/15.
 */

function sleep(milliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + milliseconds >= new Date().getTime()) {
    }
}