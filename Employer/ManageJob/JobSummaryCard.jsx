import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, Label, Button, CardContent  } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
        this.onClickCloseJobs = this.onClickCloseJobs.bind(this);
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        var link = 'http://localhost:51689/listing/listing/closeJob'
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            
            data: 
                JSON.stringify(id)
            ,
            success: function (res) {
                console.log(res)
                   
            }.bind(this),
            error: function (res) {
                console.log(res.status);
                callback();
            }
        })
    }
    
    onClickCloseJobs(e, /*{ key }*/) {
/*const buttonKey = key;*/
        this.selectJob(this.props.id) 
        console.log("key:", this.props.id);
    };
    render() {
        let currentDate = new Date();
        
        return (
        <Card style={{ width: '35rem', height: '30rem' }}>
            <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                <Label color='black' ribbon='right'><Icon name='user' />0</Label>
                    <Card.Meta>{this.props.city}, {this.props.country}</Card.Meta>
                <Card.Description>
                        {this.props.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>


                <span >
                    <div style={{ height: '100%' }} className='left floated' >
                            { this.props.expiryDate  < currentDate.toISOString() ?
                            <Label color='red'  >Expired</Label>
                            :
                            <Label color='blue' >Unexpired</Label>
                        }
                    </div>
                    <div style={{ width: '70%' }} className='right floated ui three buttons'>
                        <Button key={1} basic color='blue' onClick={this.onClickCloseJobs} ><Icon name="close" />Close</Button>
                        <Button basic color='blue'><Icon name="edit" />Edit</Button>
                        <Button basic color='blue'><Icon name="copy" />Copy</Button>
                    </div>
                </span>
            </Card.Content>
            </Card>
            )
    }
}