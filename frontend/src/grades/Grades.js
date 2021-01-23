import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class Grades extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: [],
      projects: [],      
      inputProjectLink: '',
      inputGrade:'',     
      idProject:'',
      inputId:'',      
      idUser:'',      
      showModal:false,
      showDescription:false,
      emailUser:'',
      users:[],
      members:[]

    };
  }

    
    handleChangeLink=(event)=>{
        this.setState({
            inputProjectLink:event.target.value
        })
    }
    handleChangeGrade=(event)=>{
         this.setState({
            inputGrade:event.target.value
        })
    }

    
    
    handleChangeId=(event)=>{
        this.setState({
            inputId:event.target.value
        })
    }
  

  componentDidMount() {

axios.get('http://localhost:3003/api/note')
      .then(response=>{
         this.setState(previousState=>{
          return {
            note: response.data
          }
        })
      }).catch(error => {
        console.log(error);
      });
      
      axios.get('http://localhost:3003/api/projects')
      .then(response=>{
         this.setState(previousState=>{
          return {
            projects: response.data
          }
        })
      }).catch(error => {
        console.log(error);
      });      
      
  }
  
  handleClose = () => {
    this.setState(previousState => {
      return {
        showModal: false
      }
    })
  };
  


  handleShow = () => {
    this.setState(previousState => {
      return {
        showModal: true
      }
    })
  };
  

  handleNewProject = () => {

    let idProiect;
    
    for(let p of this.state.projects)
    { console.log(p.id_project+" ");
      if(p.link===this.state.inputProjectLink){
        idProiect=p.id_project;
        console.log(idProiect+" this is the id");
    }
      
    }
   
    
    axios
      .post('http://localhost:3003/api/nota',  {link_commit: this.state.inputProjectLink, 
    punctaj: this.state.inputGrade, id_project:idProiect, id_user:this.state.inputId})
      .then(response => {
        this.handleClose();
      }).catch(error => {
        this.handleClose();
      });
  }

  render() {
    var project;
     project=this.state.projects.map((el)=>         
        <option  key={el.id_project}>{el.link}</option>        
        
      );
    const rows = this.state.note.map(el => 
      <tr key={el.id_nota}>
        <th scope="row">{el.id_nota}</th>
        <td><a href={el.link_commit} target="_blank" rel="noopener noreferrer">{el.link_commit}</a></td>
        <td>{el.punctaj}</td>     
           
          <td>{el.id_user}</td>
       
      </tr>
    );

    return (
  
        <div className="projects">
          <div className="call-to-action">
            <button className="btn btn-primary center" type="button" onClick={this.handleShow}>Add new grade</button>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Link commit</th>
                <th scope="col">Grade</th>
                  
                <th scope="col">Student Id</th>
                         
              </tr>
            </thead>
            <tbody>  
              { rows }
            </tbody>
          </table>
          
                  
          
          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add new grade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
             <div className="form-group">
                    <label htmlFor="projectNameInputTeam">Project name</label>
                    <select  label="dsadsa" className="form-control" 
                           onChange={ event => this.handleChangeLink(event) }>
                           <option key="0">---Choose a project link---</option>
                         {project}
                    </select>
           </div>

           <div className="form-group">
                <label htmlFor="punctaj">Your grade</label>
                <input type="text" className="form-control" 
                       id="idGrade" 
                       placeholder="Enter your grade" 
                       value = { this.state.inputGrade } onChange = { event => this.handleChangeGrade(event) }/>
            
              </div>

              
             
              <div className="form-group">
                <label htmlFor="id_user">Your id</label>
                <input type="text" className="form-control" 
                       id="idStudent" 
                       placeholder="Enter your student id" 
                       value = { this.state.inputId } onChange = { event => this.handleChangeId(event) }/>
            
              </div>

             
            
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleNewProject}>
                Save new grade
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}

export default Grades;