// Tar in ett sant eller falskt värde som avgör om den ska spela brandlarmsljudet eller inbrottsljudet
function Larm (Brandlarm: boolean) {
    if (Brandlarm) {
        music.play(music.stringPlayable("C5 B C5 B C5 B C5 B ", 150), music.PlaybackMode.LoopingInBackground)
        basic.showString("Evakuera")
    } else {
        music.play(music.stringPlayable("C5 B C5 B C5 B C5 B ", 1000), music.PlaybackMode.LoopingInBackground)
        basic.showString("Larmar polis")
    }
}
function Stängdörr () {
    servos.P0.setAngle(0)
    music.play(music.stringPlayable("B A C5 B - - - - ", 500), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.A, function () {
    if (AktivtNummer < 9) {
        AktivtNummer = AktivtNummer + 1
    } else {
        AktivtNummer = 0
    }
    basic.showNumber(AktivtNummer)
})
function ÖppnaDörr () {
    servos.P0.setAngle(90)
    music.play(music.stringPlayable("F G B C5 - - - - ", 500), music.PlaybackMode.UntilDone)
}
// Sätter koden till 1, 2, 3 ,4 och sätter några andra variabler till lämpliga värden
function Setup () {
    basic.showNumber(AktivtNummer)
    AktivtNummer = 0
    Kåd = [
    1,
    2,
    3,
    4
    ]
    InmatadKåd = [
    0,
    0,
    0,
    0
    ]
}
input.onButtonPressed(Button.B, function () {
    if (Upplåst == 0) {
        for (let index = 0; index <= 2; index++) {
            InmatadKåd[index] = InmatadKåd[1 + index]
        }
        InmatadKåd[3] = AktivtNummer
        Upplåst = 1
        AktivtNummer = 0
        basic.showNumber(AktivtNummer)
        for (let index = 0; index <= 3; index++) {
            if (Kåd[index] != InmatadKåd[index]) {
                Upplåst = 0
                break;
            }
        }
        if (Upplåst == 1) {
            ÖppnaDörr()
        }
    } else {
        for (let index = 0; index <= 2; index++) {
            InmatadKåd[index] = InmatadKåd[1 + index]
        }
        InmatadKåd[3] = AktivtNummer
        Upplåst = 0
        AktivtNummer = 0
        basic.showNumber(AktivtNummer)
        for (let index = 0; index <= 3; index++) {
            if (Kåd[index] != InmatadKåd[index]) {
                Upplåst = 1
                break;
            }
        }
        if (Upplåst == 0) {
            Stängdörr()
        }
    }
})
// Känner av jordbävningar och utlöser ett larm
// 
input.onGesture(Gesture.Shake, function () {
    music.play(music.stringPlayable("- B - B - B - B ", 700), music.PlaybackMode.LoopingInBackground)
})
// Köra setup funktionen och stänga dörren
let Upplåst = 0
let InmatadKåd: number[] = []
let Kåd: number[] = []
let AktivtNummer = 0
let FarligTemperatur = 40
Setup()
servos.P0.setAngle(0)
loops.everyInterval(1000, function () {
    if (input.temperature() > FarligTemperatur) {
        Larm(true)
    }
})
