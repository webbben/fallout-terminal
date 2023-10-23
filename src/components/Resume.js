import React from "react";
import { useNavigate } from "react-router-dom";

export default function Resume() {

    const navigate = useNavigate();

    const epicSrc = `https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Epic_Systems.svg/640px-Epic_Systems.svg.png`;
    const iuSrc = `https://seeklogo.com/images/I/indiana-university-logo-043A097AA5-seeklogo.com.png`;
    const nanzanSrc = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb5Ma9VnaCrBm2JJirWa-Axpfn4LuC5-DDaLiEK-_L1goAbw2NA2eSCmEcyR6Im6QhRMM&usqp=CAU`;

    return (
        <>
            <h2>Resume</h2>
            <button 
            style={{ float: 'right' }}
            onClick={() => navigate('/main')}>Back</button>

            <div style={{ textAlign: 'left' }}>
                <h3>Education</h3>
                <div className="flexRow">
                    <img src={iuSrc} style={{ width: '120px', height: '120px', borderStyle: 'groove', margin: '5px'}}></img>
                    <div className="flexCol" style={{ margin: '5px'}}>
                        <span>Indiana University, Bloomington IN</span>
                        <span>Computer Science BS, Japanese BA</span>
                        <span>May 2020</span>
                    </div>
                </div>
                <div className="flexRow">
                    <img src={nanzanSrc} style={{ width: '120px', height: '120px', borderStyle: 'groove', margin: '5px'}}></img>
                    <div className="flexCol" style={{ margin: '5px'}}>
                        <span>Nanzan University, Nagoya Japan</span>
                        <span>Intensive Japanese Study Abroad Program</span>
                        <span>Sept 2018 - May 2019</span>
                    </div>
                </div>
                <h3>Work Experience</h3>
                <div className="flexRow">
                    <img src={epicSrc} style={{ width: '120px', height: '120px', borderStyle: 'groove', margin: '5px'}}></img>
                    <div className="flexCol" style={{ margin: '5px'}}>
                        <span>Epic Systems</span>
                        <span>Software Engineer</span>
                        <span>Aug 2020 - Aug 2023</span>
                    </div>
                </div>
                <h3>Technical Skills</h3>
                <h3>Language</h3>
                
            </div>
        </>
    );
}