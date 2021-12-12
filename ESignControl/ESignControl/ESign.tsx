import * as React from "react";
import * as ReactDom from "react-dom";
import { DefaultButton, Panel, PrimaryButton, Text } from '@fluentui/react/lib/';
import { mergeStyleSets } from "@uifabric/styling";
interface EsignProperties {
    onSelectionChange: (selectedOption: any) => void

}
const buttonStyles = { root: { marginRight: 8 } };
const styles = mergeStyleSets({
    HeaderText: {
        fontFamily: "SegoeUI !important",
        fontWeight: "bold",
        fontSize: "16px !important",
    },
});
export default class Esign extends React.Component<EsignProperties, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    render() {

        return (
            <div>
                <DefaultButton text="Add Sign" onClick={this.openPanel.bind(this)} />
                <Panel
                    isOpen={this.state.isOpen}
                    isFooterAtBottom={true}
                    customWidth="887px"
                    type={7}
                    onDismiss={this.closePanel.bind(this)}
                    onRenderFooterContent={this.createFooter.bind(this)}
                    onRenderHeader={this.createHeader.bind(this)}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <canvas id="sig-canvas" width="620" height="160">
                                    Get a better browser, bro.
                                </canvas>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-primary" id="sig-submitBtn">Submit Signature</button>
                                <button className="btn btn-default" id="sig-clearBtn">Clear Signature</button>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <textarea id="sig-dataUrl" className="form-control" rows={5}>Data URL for your signature will go here!</textarea>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <img id="sig-image" src="" alt="Your signature will go here!" />
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
        )

    }

    private openPanel() {
        this.setState({
            isOpen: true
        });

    }

    private closePanel() {
        this.setState({
            isOpen: false
        });
    }

    private saveClosePanel() {
        this.setState({
            isOpen: false
        });
    }


    private createHeader() {
        return (
            <div className='kf_customPanelHeader'>
                <Text variant="large" className={styles.HeaderText}>
                    Add ESign
                </Text>
                <span className="kf_Subtitle">
                    Add or Sign in the canvas below and save your signature as an image!.
                </span>
            </div>
        )
    }

    private createFooter(): JSX.Element {
        return (
            <div className="kf_footer">
                <PrimaryButton
                    onClick={this.saveClosePanel.bind(this)}
                    styles={buttonStyles}
                >
                    Save &amp; Close
                </PrimaryButton>
                <DefaultButton onClick={this.closePanel.bind(this)}>
                    Cancel
                </DefaultButton>
            </div>

        );
    }

    componentDidMount() {
        (function () {
            //@ts-ignore
            window.requestAnimFrame = (function (callback) {
                //@ts-ignore
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimaitonFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();

            var canvas: any = document.getElementById("sig-canvas");
            var ctx = canvas.getContext("2d");
            ctx.strokeStyle = "#222222";
            ctx.lineWidth = 4;

            var drawing = false;
            var mousePos = {
                x: 0,
                y: 0
            };
            var lastPos = mousePos;

            canvas.addEventListener("mousedown", function (e: any) {
                drawing = true;
                lastPos = getMousePos(canvas, e);
            }, false);

            canvas.addEventListener("mouseup", function (e: any) {
                drawing = false;
            }, false);

            canvas.addEventListener("mousemove", function (e: any) {
                mousePos = getMousePos(canvas, e);
            }, false);

            // Add touch event support for mobile
            canvas.addEventListener("touchstart", function (e: any) {

            }, false);

            canvas.addEventListener("touchmove", function (e: any) {
                var touch = e.touches[0];
                var me = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(me);
            }, false);

            canvas.addEventListener("touchstart", function (e: any) {
                mousePos = getTouchPos(canvas, e);
                var touch = e.touches[0];
                var me = new MouseEvent("mousedown", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(me);
            }, false);

            canvas.addEventListener("touchend", function (e: any) {
                var me = new MouseEvent("mouseup", {});
                canvas.dispatchEvent(me);
            }, false);

            function getMousePos(canvasDom: any, mouseEvent: any) {
                var rect = canvasDom.getBoundingClientRect();
                return {
                    x: mouseEvent.clientX - rect.left,
                    y: mouseEvent.clientY - rect.top
                }
            }

            function getTouchPos(canvasDom: any, touchEvent: any) {
                var rect = canvasDom.getBoundingClientRect();
                return {
                    x: touchEvent.touches[0].clientX - rect.left,
                    y: touchEvent.touches[0].clientY - rect.top
                }
            }

            function renderCanvas() {
                if (drawing) {
                    ctx.moveTo(lastPos.x, lastPos.y);
                    ctx.lineTo(mousePos.x, mousePos.y);
                    ctx.stroke();
                    lastPos = mousePos;
                }
            }

            // Prevent scrolling when touching the canvas
            document.body.addEventListener("touchstart", function (e: any) {
                if (e.target == canvas) {
                    e.preventDefault();
                }
            }, false);
            document.body.addEventListener("touchend", function (e: any) {
                if (e.target == canvas) {
                    e.preventDefault();
                }
            }, false);
            document.body.addEventListener("touchmove", function (e: any) {
                if (e.target == canvas) {
                    e.preventDefault();
                }
            }, false);

            (function drawLoop() {
                requestAnimationFrame(drawLoop);
                renderCanvas();
            })();

            function clearCanvas() {
                canvas.width = canvas.width;
            }

            // Set up the UI
            var sigText: any = document.getElementById("sig-dataUrl");
            var sigImage: any = document.getElementById("sig-image");
            var clearBtn: any = document.getElementById("sig-clearBtn");
            var submitBtn: any = document.getElementById("sig-submitBtn");
            clearBtn.addEventListener("click", function (e: any) {
                clearCanvas();
                sigText.innerHTML = "Data URL for your signature will go here!";
                sigImage.setAttribute("src", "");
            }, false);
            submitBtn.addEventListener("click", function (e: any) {
                var dataUrl = canvas.toDataURL();
                sigText.innerHTML = dataUrl;
                sigImage.setAttribute("src", dataUrl);
            }, false);

        })();
    }
}
