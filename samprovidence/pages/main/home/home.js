'use strict';

var canvas, context;

function getRandomIntBetweenInclusive(min,max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandomPointInSquareOfTriangle(points) {
    var bottom_left = {x : Math.min(points.a.x, points.b.x, points.c.x), y : Math.min(points.a.y, points.b.y, points.c.y)};
    var top_right = {x: Math.max(points.a.x, points.b.x, points.c.x), y: Math.max(points.a.y, points.b.y, points.c.y)};

    return {x: getRandomIntBetweenInclusive(bottom_left.x, top_right.x), y: getRandomIntBetweenInclusive(bottom_left.y, top_right.y)};
}

function euclideanDistance(point_a, point_b) {
    return Math.sqrt(Math.pow((point_a.x - point_b.x), 2) + Math.pow((point_a.y - point_b.y), 2));
}

function initializeCanvas() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    sierpinski();
}

function halfwayPlusOffset(one, two) {
    var min = one < two ? one : two;
    var max = one < two ? two : one;
    return (max - min)/2 + min;
}

function halfwayPoint(point_one, point_two) {
    return {x : halfwayPlusOffset(point_one.x, point_two.x), y : halfwayPlusOffset(point_one.y, point_two.y)};
}

function nextPoint(points, current) {
    var directionPoint = getRandomIntBetweenInclusive(0, 2);

    if (directionPoint == 0) {
        return halfwayPoint(points.a, current);
    } else if (directionPoint == 1) {
        return halfwayPoint(points.b, current);
    } else {
        return halfwayPoint(points.c, current);
    }
}

function sierpinski() {
    var point_a, point_b, point_c;
    var color_a, color_b, color_c;

    point_a = {x : getRandomIntBetweenInclusive(0, 450), y : getRandomIntBetweenInclusive(0, 450)};
    point_b = {x : getRandomIntBetweenInclusive(0, 450), y : getRandomIntBetweenInclusive(0, 450)};
    point_c = {x : getRandomIntBetweenInclusive(0, 450), y : getRandomIntBetweenInclusive(0, 450)};

    color_a = "#F0134A";
    color_b = "#1347F0";
    color_c = "#F7F707";

    context.fillStyle = color_a;
    context.fillRect(point_a.x, point_a.y, 1, 1);

    context.fillStyle = color_b;
    context.fillRect(point_b.x, point_b.y, 1, 1);

    context.fillStyle = color_c;
    context.fillRect(point_c.x, point_c.y, 1, 1);

    //Start at point A, roll 5 times, then start drawing
    var points = {a : point_a, b : point_b, c : point_c};
    var current_point = getRandomPointInSquareOfTriangle(points);

    for (var i = 0; i < 5; i++) {
        current_point = nextPoint(points, current_point);
    }

    context.beginPath();
    context.moveTo(current_point.x, current_point.y);

    var dist_a, dist_b, dist_c, dist_min;

    for (var j = 0; j < 10000; j++) {
        current_point = nextPoint(points, current_point);

        dist_a = euclideanDistance(current_point, points.a);
        dist_b = euclideanDistance(current_point, points.b);
        dist_c = euclideanDistance(current_point, points.c);
        dist_min = Math.min(dist_a, dist_b, dist_c);

        context.fillStyle = dist_min === dist_a ? color_a : dist_min === dist_b ? color_b : color_c;
        context.fillRect(current_point.x, current_point.y, 1, 1);
        context.stroke();
    }
}