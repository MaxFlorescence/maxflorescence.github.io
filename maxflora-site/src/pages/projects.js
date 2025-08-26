// import { getProjects, createProject, getQualifications, assignWorker, unassignWorker, getWorkers } from '../services/dataService';
// import { useEffect, useReducer, useState } from 'react'
import ClickList from '../components/ClickList'
import LocationID from '../utils/location'
import { pageStyle, greenBubble, blueBubble, vertSpaced, horiSpaced } from '../utils/styles'
// import Modal from '../components/Modal'
// import Dropdown from '../components/Dropdown'
// import Multiselect from '../components/Multiselect'

// const Project = (project, active, workers, forceUpdate) => {
//     return (
//         <div>
//             <div style={{ display: 'flex', alignItems: 'flex-center' }}>
//                 {project.name}
//                 <div style={fieldNameStyle}>
//                     Size:&#160;
//                     <span style={fieldNumberStyle}>
//                         {project.size.substring(0,1)}
//                     </span>&nbsp;
//                     Status:&#160;
//                     <span style={fieldNumberStyle}>
//                         {project.status.substring(0,3)}
//                     </span>&nbsp;
//                     Workers:&#160;
//                     <span style={fieldNumberStyle}>
//                         {project.workers.length}
//                     </span>&nbsp;
//                     Qualifications:&#160;
//                     <span style={fieldNumberStyle}>
// 	                {project.qualifications.length - project.missingQualifications.length}
// 	                /
//                         {project.qualifications.length}
//                     </span>&nbsp;
//                 </div>
//             </div>
//         {active === true ? ProjectBody(project, workers, forceUpdate) : null}
//         </div>
//     );
// }

// const ProjectBody = (project, workers, forceUpdate) => {
//     const current_workers = workers.filter(p =>
// 	p.projects.includes(project.name))
//     const assignable_workers = workers.filter(w => {
//         let valid_status = ["PLANNED", "SUSPENDED"].includes(project.status)
//         let not_assigned = !project.workers.includes(w.name)
//         let is_helpful = project.missingQualifications.some(q => w.qualifications.includes(q))
//         let valid_workload = w.workload + ["SMALL", "MEDIUM", "BIG"].indexOf(project.size) <= 11
//         return valid_status && not_assigned && is_helpful && valid_workload
//     })

//     const labelled_qualifications = project.qualifications.map(q => (project.missingQualifications.includes(q) ? "[✗] " : "[✓] ") + q)

//     return (
//         <span>
//             <div style={orangeContainerStyle}>
//                 Qualifications: <ClickList list={labelled_qualifications} styles={lightOrangeContainerStyle} path="/qualifications" />
//             </div>
//             <div style={orangeContainerStyle}>
//                 Workers: <ClickList list={project.workers} styles={lightOrangeContainerStyle} path="/workers" />
//                 {assignable_workers.length === 0 ? null :
//                     <Modal label="+ Assign Worker" title={'Assign to "' + project.name + '"...'} onSubmit={async (submission) => {
//                         let response = await assignWorker(submission.worker, project.name)
//                         forceUpdate()
//                         return response
//                     }}>
//                         Worker: <select name="worker" className="padded" style={{marginBottom:"10px"}}>
//                             {assignable_workers.map(w => <option key={w.name} value={w.name}>{w.name}</option>)}
//                         </select>
//                     </Modal>
//                 }
// 	        {current_workers.length === 0 ? null :
// 	             <Modal label="- Unassign Worker" title={"Unassign " + project.name + " from..."} onSubmit={async (submission) => {
// 			 let response = await unassignWorker(submission.worker, project.name)
// 			 forceUpdate()
// 			 return response
//                      }}>
//                  Worker: <select name="worker" className="padded" style={{marginBottom:"10px"}}>
//                              {current_workers.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
//                          </select>
//                     </Modal>
// 		 }	    
//             </div>
//         </span>
//     )
// }

// const Projects = () => {
//     const [update, forceUpdate] = useReducer(x => x+1, 0)
//     const [projects, setProjects] = useState([])
//     const [workers, setWorkers] = useState([])
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortCriteria, setSortCriteria] = useState('Name');
//     const [sortAscending, setSortAscending] = useState(true);
//     const [qualDescriptions, setQualDescriptions] = useState([]);

//     useEffect(() => {
//         getProjects().then(setProjects);
//         getWorkers().then(setWorkers);
//         getQualifications().then(result => setQualDescriptions(result.map(q => q.description)));
//     }, [update]);

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value.toLowerCase());
//     };

//     const status_order = ['PLANNED', 'SUSPENDED', 'ACTIVE', 'FINISHED'];
//     const sortedAndFilteredProjects = projects
//     .filter(project =>
//         project.name.toLowerCase().includes(searchTerm) ||
// 	    project.workers.some(worker =>
// 		worker.toLowerCase().includes(searchTerm)
// 	    ) ||
// 	    project.qualifications.some(qualification =>
// 		qualification.toLowerCase().includes(searchTerm)
// 	    )
//     )
//     .sort((a, b) => {
//         let comparison = 0;
//         if (sortCriteria === 'Name') {
//             comparison = a.name.localeCompare(b.name)
//         } else if (sortCriteria === 'Size') {
//             comparison = b.size.localeCompare(a.size)
//         } else if (sortCriteria === 'Status') {
// 	    const a_index = status_order.indexOf(a.status);
// 	    const b_index = status_order.indexOf(b.status);
// 	    comparison = a_index - b_index;
//         } else if (sortCriteria === 'Workers') {
//             comparison = a.workers.length - b.workers.length;
//         } else if (sortCriteria === 'Qualifications') {
//             comparison = a.qualifications.length - b.qualifications.length;
//         } else if (sortCriteria === 'Missing Qualifications') {
//             comparison = a.missingQualifications.length - b.missingQualifications.length;
//         }
//         return sortAscending ? comparison : -comparison;
//     });

//     const handleSortCriteriaChange = (criteria) => {
//         setSortCriteria(criteria);
//     };

//     const handleSortDirectionChange = () => {
//         setSortAscending(!sortAscending);
//     };

//     const active = LocationID('projects', sortedAndFilteredProjects, 'name')
//     return (
//         <div style={pageStyle}>
//             <h1>
//                 Company Projects
//             </h1>
//             <input
//                 type="text"
//                 placeholder="Search for projects..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 style={{ margin: '10px 0' }}
//             /> &#160;

//             <Modal label="Create Project" title="Create New Project" onSubmit={async (submission) => {
//                 let response = await createProject(submission.name, submission.size, submission.qualifications)
//                 forceUpdate()
//                 return response
//             }}>
//                 Name: <input name="name" style={{marginBottom:"10px"}} required /><br/>
//                 Size: <select name="size" className="padded" style={{marginBottom:"10px"}} >
//                     <option value="SMALL">Small</option>
//                     <option value="MEDIUM">Medium</option>
//                     <option value="BIG">Big</option>
//                 </select><br/>
//                 Qualifications: <Multiselect name="qualifications[]" options={qualDescriptions} />
//             </Modal> &#160;

//             Sort&nbsp;By:&nbsp;
//             <Dropdown onChange={handleSortCriteriaChange} options={[
//                 "Name", "Size", "Status", "Workers", "Qualifications", "Missing Qualifications"
//             ]} /> &nbsp;

//             <button className='padded' onClick={handleSortDirectionChange}> &#8645; </button>

//             <ClickList active={active} list={sortedAndFilteredProjects} item={(p, a) => Project(p, a, workers, forceUpdate)} path='/projects' id='name' />
//         </div>
//     )

// }

// export default Projects

const ProjectHeader = (label, title, link) => {
    return (
        <div style={horiSpaced}>
            <div style={greenBubble}>{label}</div>
            <div style={greenBubble}>{title}</div>
            {link !== undefined ? <a href={link}>&#128279;</a> : null}
        </div>
    )
}

const ProjectBody = (skills, desc) => {
    return (
        <div style={vertSpaced}>
            <div style={horiSpaced}>
                <div style={{...horiSpaced, ...blueBubble}}>
                    Skills:
                    {skills.map(s => 
                        <div style={{paddingLeft:'1vw'}}>{s}</div>
                    )}
                </div>
            </div>
            <div style={blueBubble}>{desc}</div>
        </div>
    )
}

const makeLabel = (start, end) => {
    const options = { year: "numeric", month: "short" };
    return (start.toLocaleDateString(undefined, options) + ' - ' + end.toLocaleDateString(undefined, options))
}

const Projects = () => {
    const projectList = [
        {
            start: new Date(2024, 7),
            end: new Date(2025, 4),
            link: "https://github.com/MaxFlorescence/spectral_redistricting",
            title: "Congressional Redistricting Research",
            id: "thesis",
            skills: ["Python", "Slurm", "Numpy", "NetworkX", "Researching"],
            desc: "Consolidated existing code to create a flexible interface for partitioning states into congressional districts. Characterized and incorporated two novel algorithms in the application domain."
        },
        {
            start: new Date(2024, 0),
            end: new Date(2024, 4),
            link: "https://github.com/CS-CS415-Spring2024/t09",
            title: "Company Management Web App (private)",
            id: "cs415",
            skills: ["JavaScript", "React", "Java", "Agile", "Test-Driven Development"],
            desc: "Developed react-based web app for managing employees and projects in a company. Worked with four others using test-driven development."
        },
        {
            start: new Date(2024, 0),
            end: new Date(2024, 4),
            link: "https://github.com/CSU-CS214-Spring2014/assignment_autograding",
            title: "GitHub Classroom Autograding Script (private)",
            id: "cs214",
            skills: ["Python", "GitHub", "Java", "Regex", "Shell Scripting"],
            desc: "Implemented a complex program for automatically grading student’s repositories in GitHub Classroom from scratch. Gives graders the ability to specify parameterized tests which will be run on every student’s code, then collects the results in an easy-to-read format."
        },
        {
            start: new Date(2023, 4),
            end: new Date(2024, 4),
            link: "https://github.com/Blanchard-lab/6D-Pose-Annotation-Tool",
            title: "6-D Pose Interpolation Script (private)",
            id: "6dpose",
            skills: ["Python", "Anaconda", "Computer Vision", "OpenCV", "Data Science"],
            desc: "Worked with machine learning models centered around computer vision. Wrote interpolation scripts for decreasing the work required to create ground-truth annotations of 6D-pose datasets."
        },
        {
            start: new Date(2023, 0),
            end: new Date(2023, 4),
            link: "https://github.com/MaxFlorescence/math-handwriting-project",
            title: "Handwritten Math Classifier",
            id: "cs445",
            skills: ["Python", "PyTorch", "Numpy", "Pandas", "Data Science", "Jupyter"],
            desc: "Tuned hyperparameters for a convolutional neural network using k-fold cross validation. Processed and trained on a dataset of handwritten math symbols."
        },
        {
            start: new Date(2022, 0),
            end: new Date(),
            link: "https://github.com/MaxFlorescence/Blobby",
            title: "3D Platformer Game",
            id: "blobby",
            skills: ["C#", "Unity", "Blender", "GIMP"],
            desc: "Created a physics-based platformer in Unity using assets modeled in Blender."
        },
        {
            start: new Date(2021, 7),
            end: new Date(2021, 11),
            link: "https://github.com/CSU-CS-314-Fall-2021/t23",
            title: "Trip Planner Web App (private)",
            id: "cs314",
            skills: ["JavaScript", "React", "Java", "Agile", "Test-Driven Development"],
            desc: "Developed a responsive, react-based web app for planning global trips, featuring SQL database interaction. Worked with four others using an agile development framework."
        },
        {
            start: new Date(2022, 0),
            end: new Date(2022, 4),
            link: undefined,
            title: "Simultaneous Multithreading Research",
            id: "smt",
            skills: ["Researching"],
            desc: "Surveyed the literature surrounding simultaneous multithreading technology. Discussed its beginnings, evolution, state-of-the-art, and future capabilities."
        },
        {
            start: new Date(2022, 7),
            end: new Date(2022, 11),
            link: undefined,
            title: "Quaternions and 3D Rotations Research Poster",
            id: "math419",
            skills: ["Researching", "Science Communication"],
            desc: "Independently researched the connection between quaternions and 3-dimensional rotations. Effectively summarized and communicated findings in a visual poster format."
        },
        {
            start: new Date(2025, 0),
            end: new Date(),
            link: "https://github.com/MaxFlorescence/Cobblemon-Simple-Creation",
            title: "\"Cobblemon: Simple Creation\" Minecraft Mod",
            id: "cscmm",
            skills: ["Java", "GIMP"],
            desc: "Developed a Neoforge Minecraft mod that provides an interface between two existing mods (\"Create\" and \"Cobblemon\")."
        },
        {
            start: new Date(2025, 3),
            end: new Date(),
            link: "maxflorescence.github.io",
            title: "Personal Website",
            id: "this",
            skills: ["React", "JavaScript", "GitHub"],
            desc: "You're looking at it!"
        }
    ]

    projectList.sort((a, b) => 
        (a.end.getTime() === b.end.getTime()) ? (a.start < b.start) : (a.end < b.end)
    )
    const active = LocationID('projects', projectList, 'id')
    return (
        <div className="App" style={pageStyle}>
            <ClickList
                active={active}
                list={projectList}
                item={(val,act) => <div style={vertSpaced}>
                    {ProjectHeader(makeLabel(val.start, val.end), val.title, val.link)}
                    {act ? ProjectBody(val.skills, val.desc) : null}
                </div>}
                path="/projects"
                id="id"
            />
        </div>
    )

}

export default Projects
