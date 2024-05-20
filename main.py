def Larm(Brandlarm: bool):
    if Brandlarm:
        while Brandlarm:
            pass
        basic.show_string("Evakuera")
    else:
        while True:
            pass
def Stängdörr():
    servos.P0.set_angle(0)
    music.play(music.string_playable("B A C5 B - - - - ", 500),
        music.PlaybackMode.UNTIL_DONE)
def Unlock():
    ÖppnaDörr()

def on_button_pressed_a():
    global ActiveNumber
    if ActiveNumber < 9:
        ActiveNumber = ActiveNumber + 1
    else:
        ActiveNumber = 0
    basic.show_number(ActiveNumber)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_shake():
    pass
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def ÖppnaDörr():
    servos.P0.set_angle(90)
    music.play(music.string_playable("F G B C5 - - - - ", 500),
        music.PlaybackMode.UNTIL_DONE)
def Setup():
    global ActiveNumber, Code, TryCode
    basic.show_number(ActiveNumber)
    ActiveNumber = 0
    Code = [1, 2, 3, 4]
    TryCode = [0, 0, 0, 0]

def on_button_pressed_b():
    global Unlocked, ActiveNumber
    if Unlocked == 0:
        for index in range(3):
            TryCode[index] = TryCode[1 + index]
        TryCode[3] = ActiveNumber
        Unlocked = 1
        ActiveNumber = 0
        basic.show_number(ActiveNumber)
        for index2 in range(4):
            if Code[index2] != TryCode[index2]:
                Unlocked = 0
                break
        if Unlocked == 1:
            Unlock()
    else:
        for index3 in range(3):
            TryCode[index3] = TryCode[1 + index3]
        TryCode[3] = ActiveNumber
        Unlocked = 0
        ActiveNumber = 0
        basic.show_number(ActiveNumber)
        for index4 in range(4):
            if Code[index4] != TryCode[index4]:
                Unlocked = 1
                break
        if Unlocked == 0:
            Stängdörr()
input.on_button_pressed(Button.B, on_button_pressed_b)

Unlocked = 0
TryCode: List[number] = []
Code: List[number] = []
ActiveNumber = 0
Setup()
servos.P0.set_angle(0)

def on_every_interval():
    pass
loops.every_interval(1000, on_every_interval)

def on_every_interval2():
    pass
loops.every_interval(500, on_every_interval2)
