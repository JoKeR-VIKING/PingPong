let hitter = document.getElementsByClassName("hitter");
let hitterLeft = hitter[0].getBoundingClientRect().left;
let turn = true;
let playerOneLives = document.getElementsByClassName("playerOne-lives")[0].children;
let playerTwoLives = document.getElementsByClassName("playerTwo-lives")[0].children;
let livesOne = 3, livesTwo = 3;

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter")
    {
        roundStart();
    }
    else if (event.key === "a")
    {
        if (hitterLeft <= 0)
        {
            hitter[0].style.left = hitter[1].style.left = "0";
            return;
        }

        hitterLeft -= 10;
        hitter[0].style.left = hitter[1].style.left = hitterLeft + "px";
    }
    else if (event.key === "d")
    {
        if (hitterLeft >= window.innerWidth - 102)
        {
            hitter[0].style.left = hitter[1].style.left = (window.innerWidth - 102) + "px";
            return;
        }

        hitterLeft += 10;
        hitter[0].style.left = hitter[1].style.left = hitterLeft + "px";
    }
});

function roundStart()
{
    let ball = document.getElementsByClassName("ball")[0];
    let coord = ball.getBoundingClientRect();

    let top = coord.top;
    let left = coord.left;
    let newTop = 0;
    let newLeft = Math.floor(Math.random() * (window.innerWidth - 100));
    turn = true;

    let dx = Math.abs(newLeft - left);
    let dy = Math.abs(newTop - top);
    let steps = Math.max(dx, dy);
    let xIn = dx/steps, yIn = dy/steps;

    let moveInterval = setInterval(function() {
        let hitterOneCoord = hitter[0].getBoundingClientRect();
        let hitterTwoCoord = hitter[1].getBoundingClientRect();
        let coord = ball.getBoundingClientRect();

        if (top >= newTop && !turn)
        {
            livesTwo--;
            clearInterval(moveInterval);
            ball.style.top = "calc(50vh - 50px)";
            ball.style.left = "calc(50vw - 50px)";
            hitter[0].style.left = "calc(50% - 100px)";
            hitter[1].style.left = "calc(50% - 100px)";
            hitterLeft = hitter[0].getBoundingClientRect().left;

            if (livesTwo === 0)
            {
                window.alert("Player One Wins!");
                for (let i=0;i<playerOneLives.length;i++)
                {
                    playerOneLives[i].style.display = "block";
                    playerTwoLives[i].style.display = "block";
                }
            }
            else
            {
                playerTwoLives[3 - livesTwo].style.display = "none";
            }

            return;
        }
        else if (top <= newTop && turn)
        {
            livesOne--;
            clearInterval(moveInterval);
            ball.style.top = "calc(50vh - 50px)";
            ball.style.left = "calc(50vw - 50px)";
            hitter[0].style.left = "calc(50% - 100px)";
            hitter[1].style.left = "calc(50% - 100px)";
            hitterLeft = hitter[0].getBoundingClientRect().left;

            if (livesOne === 0)
            {
                window.alert("Player Two Wins!");
                for (let i=0;i<playerOneLives.length;i++)
                {
                    playerOneLives[i].style.display = "block";
                    playerTwoLives[i].style.display = "block";
                }
            }
            else
            {
                playerOneLives[3 - livesOne].style.display = "none";
            }

            return;
        }
        else if (top <= hitterOneCoord.bottom && left >= hitterOneCoord.left && left <= hitterOneCoord.right && turn)
        {
            newTop = window.innerHeight - 50;
            newLeft = Math.floor(Math.random() * (window.innerWidth - 100));
            dx = Math.abs(newLeft - left);
            dy = Math.abs(newTop - top);
            steps = Math.max(dx, dy);
            xIn = dx/steps;
            yIn = dy/steps;
            turn = !turn;
        }
        else if (coord.bottom >= hitterTwoCoord.top && left >= hitterTwoCoord.left && left <= hitterTwoCoord.right && !turn)
        {
            newTop = 0;
            newLeft = Math.floor(Math.random() * (window.innerWidth - 100));
            dx = Math.abs(newLeft - left);
            dy = Math.abs(newTop - top);
            steps = Math.max(dx, dy);
            xIn = dx/steps;
            yIn = dy/steps;
            turn = !turn;
        }
        else if (left <= newLeft)
        {
            newLeft = Math.floor(Math.random() * (window.innerWidth - 100));
            dx = Math.abs(newLeft - left);
            dy = Math.abs(newTop - top);
            steps = Math.max(dx, dy);
            xIn = dx/steps;
            yIn = dy/steps;
        }

        ball.style.top = top + "px";
        ball.style.left = left + "px";

        if (turn)
        {
            top -= yIn;
            left -= xIn;
        }
        else
        {
            top += yIn;
            left += xIn;
        }
    }, 8);
}
