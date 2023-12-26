from flask import Flask, render_template, Response, request
from flask_cors import CORS
from time import sleep
import cv2
import mediapipe as mp

#import imutils
#파이썬 버전 3.9.1x

app = Flask(__name__)
CORS(app)

mp_drawing = mp.solutions.drawing_utils
mp_face_detection = mp.solutions.face_detection

face_detection = mp_face_detection.FaceDetection(
    min_detection_confidence=0.6)

cap = cv2.VideoCapture(0)  
sleep(2.0)

cxg = 0;
cyg = 0;
bsg = 0;
valuelist = [];
captured = False

def refval():
    
    global cxg, cyg, bsg
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.flip(frame, 1)
        
        results = face_detection.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        
        if results.detections:
            for detection in results.detections:
                mp_drawing.draw_detection(frame, detection)
                
                x1 = detection.location_data.relative_bounding_box.xmin # 인식박스 좌측 x상대좌표값
                x2 = x1 + detection.location_data.relative_bounding_box.width # 인식박스 우측 x상대좌표값
                y1 = detection.location_data.relative_bounding_box.ymin # 인식박스 상단 y상대좌표값
                y2 = y1 + detection.location_data.relative_bounding_box.height # 인식박스 우측 x상대좌표값
                
                cx = (x1 + x2) / 2 # center of the face x
                cy = (y1 + y2) / 2 # center of the face y
                boxsize = (x2 - x1) + (y2 - y1)
                
                cxg = cx
                cyg = cy
                bsg = boxsize
                
                cv2.putText(frame, '%f x1' % (x1), org=(10, 30), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f x2' % (x2), org=(10, 60), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f y1' % (y1), org=(10, 90), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f y2' % (y2), org=(10, 120), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f cx' % (cx), org=(10, 150), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f cy' % (cy), org=(10, 180), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f boxsize' % (boxsize), org=(10, 210), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f cxg' % (cxg), org=(10, 240), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f cyg' % (cyg), org=(10, 270), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f bsg' % (bsg), org=(10, 300), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                sleep(0.1)
                
                break
            
        frame = cv2.resize(frame, (700, 500), interpolation=cv2.INTER_AREA)

        if ret :
            _, buffer = cv2.imencode('.jpg', frame) 
            frame = buffer.tobytes()  
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
                


def generate():
    
    global valuelist
    rcx = valuelist[0]
    rcy = valuelist[1]
    rbs = valuelist[2]
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.flip(frame, 1)

        results = face_detection.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

        if results.detections:
            for detection in results.detections:
                mp_drawing.draw_detection(frame, detection)

                x1 = detection.location_data.relative_bounding_box.xmin # 인식박스 좌측 x상대좌표값
                x2 = x1 + detection.location_data.relative_bounding_box.width # 인식박스 우측 x상대좌표값
                y1 = detection.location_data.relative_bounding_box.ymin # 인식박스 상단 y상대좌표값
                y2 = y1 + detection.location_data.relative_bounding_box.height # 인식박스 우측 x상대좌표값
                
                cx = (x1 + x2) / 2 # center of the face x
                cy = (y1 + y2) / 2 # center of the face y
                boxsize = (x2 - x1) + (y2 - y1)
                
                cv2.putText(frame, '%f cx' % (cx), org=(10, 30), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f cy' % (cy), org=(10, 60), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f boxsize' % (boxsize), org=(10, 90), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f rcx' % (rcx), org=(10, 120), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f rcy' % (rcy), org=(10, 150), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                cv2.putText(frame, '%f rbs' % (rbs), org=(10, 180), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=255, thickness=2)
                sleep(0.1)
                
                # good position : cx=0.49, cy = 0.5, boxsize=0.5
                
                if cx < (rcx - 0.09) :
                    cv2.putText(frame, 'too left position', org=(10, 270), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(0,0,255), thickness=2)
                if cx > (rcx + 0.09) :
                    cv2.putText(frame, 'too right position', org=(10, 300), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(0,0,255), thickness=2)
                if cy < (rcy - 0.09) :
                    cv2.putText(frame, 'too high position', org=(10, 330), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(0,0,255), thickness=2)
                if cy > (rcy + 0.09) :
                    cv2.putText(frame, 'too low position', org=(10, 360), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(0,0,255), thickness=2)
                if boxsize < (rbs - 0.05) :
                    cv2.putText(frame, 'too far position', org=(10, 390), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(0,0,255), thickness=2)
                if boxsize > (rbs + 0.05) :
                    cv2.putText(frame, 'too close position', org=(10, 420), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=(0,0,255), thickness=2)
                
                break
        
        frame = cv2.resize(frame, (700, 500), interpolation=cv2.INTER_AREA)

        if ret :
            _, buffer = cv2.imencode('.jpg', frame) 
            frame = buffer.tobytes()  
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/service_set')
def service_set():
    return Response(refval(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/service_cap')
def service_cap():
    global valuelist
    try :
        valuelist = [cxg, cyg, bsg]
        print(valuelist)
        return "true"
    
    except Exception as e:
        return "false"

@app.route('/service_start')
def service_start():
    global valuelist
    if len(valuelist) > 0:
        return "true"
    if len(valuelist) == 0:
        return "false"    

@app.route('/service')
def service():
    global valuelist
    if len(valuelist) > 0:
        return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')
    if len(valuelist == 0):
        return "Please take a capture"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8000", debug=True)