import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: false,
                showClosed: false,
                showDraft: false,
                showExpired: false,
                showUnexpired: false
            },
            totalPages: 1,
            activeIndex: "",
            cards:[
                {   Id: 1,
                    jobTitle: 'Analyst',
                    location: 'Brisbame',
                    country: 'Australia',
                    createdOn: '2012-01-01',
                    date: '2020-12-12',
                    description: 'We are looking for an Analyst',
                    status: 0
                },
              
                {
                    Id: 3,
                    jobTitle: 'Web Dev',
                    location: 'Perth',
                    country: 'Australia',
                    date: '2019-09-11',
                    createdOn: '2019-06-01',
                    description: 'We are looking for an Web Dev',
                    status: 1
                },
                {
                    Id: 4,
                    jobTitle: 'Analyst',
                    location: 'Brisbame',
                    country: 'Australia',
                    createdOn: '2019-07-01',
                    date: '2020-12-12',
                    description: 'We are looking for an Analyst',
                    status: 1

                },
                 {
                    Id: 2,
                    jobTitle: 'Software Dev',
                    location: 'Syndey',
                    country: 'Australia',
                    date: '2019-09-12',
                    createdOn: '2019-05-01',
                     description: 'We are looking for a SD',
                     status: 1
                },
                {
                    Id: 5,
                    jobTitle: 'Software Dev',
                    location: 'Syndey',
                    country: 'Australia',
                    date: '2012-11-12',
                    createdOn: '2019-08-01',
                    description: 'We are looking for a SD',
                    status: 1
                },
                {
                    Id: 6,
                    jobTitle: 'Web Dev',
                    location: 'Perth',
                    country: 'Australia',
                    date: '2020-10-12',
                    createdOn: '2019-09-01',
                    description: 'We are looking for an Web Dev',
                    status: 0
                }
            ]
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.filterChangeHandler = this.filterChangeHandler.bind(this);
        this.sortChangeHandler = this.sortChangeHandler.bind(this);
      
        //your functions go here

        
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }
    sortChangeHandler(e, data) {
        
        console.log(this.state.sortBy.date)
       if (data.value == 'newest') {
            this.setState({
                sortBy: {
                    date: "desc"
                }
            })
        }
        else if (data.value == 'oldest') {
            this.setState({
                sortBy: {
                    date: "asc"
                }
            })
        }
    }
    filterChangeHandler(e, data) {
        if (data.value == 'expired') {
            this.setState({
                filter: {

                    showActive: false,
                    showClosed: false,
                    showDraft: false,
                    showExpired: true,
                    showUnexpired: false
                }
            })
        }
        else if (data.value == 'unexpired') {
            this.setState({
                filter: {
                    showActive: false,
                    showClosed: false,
                    showDraft: false,
                    showExpired: false,
                    showUnexpired: true
                }
            })
        }
        else if (data.value == 'active') {
            this.setState({
                filter: {
                    showActive: true,
                    showClosed: false,
                    showDraft: false,
                    showExpired: false,
                    showUnexpired: false
                }
            })
        }
        else if (data.value == 'closed') {
            this.setState({
                filter: {
                    showActive: false,
                    showClosed: true,
                    showDraft: false,
                    showExpired: false,
                    showUnexpired: false
                }
            })
        }
        else if (data.value == 'draft') {
            this.setState({
                filter: {
                    showActive: false,
                    showClosed: false,
                    showDraft: true,
                    showExpired: false,
                    showUnexpired: false
                }
            })
        }
        else if (data.value == 'all') {
            this.setState({
                filter: {
                    showActive: false,
                    showClosed: false,
                    showDraft: false,
                    showExpired: false,
                    showUnexpired: false
                }
            })
        }
    }

    render() {
        const filterOptions = [
            { key: 'all', text: 'All', value: 'all' },
            { key: 'active', text: 'Active', value: 'active' },
            { key: 'closed', text: 'Closed', value: 'closed' },
            { key: 'draft', text: 'Draft', value: 'draft' },
            { key: 'expired', text: 'Expired', value: 'expired' },
            { key: 'unexpired', text: 'Unexpired', value: 'unexpired' },
        ]
        const sortOptions = [
            { key: 'newest', text: 'Newest first', value: 'newest' },
            { key: 'oldest', text: 'Oldest first', value: 'oldest' },
        ]
        let currentDate = new Date();
        let sortedCards =[];
        if (this.state.sortBy.date == 'desc') {
            sortedCards = this.state.cards.sort((a, b) => {

                if (a.Id <= b.Id) {
                    return 1
                }
                else {
                    return -1
                }
                console.log(sortedCards)
            })
        } else if (this.state.sortBy.date == 'asc')  {
             sortedCards = this.state.cards.sort((a, b) => {

                if (a.Id > b.Id) {
                    return 1
                }
                else {
                    return -1
                 }
             }) 
        }
        let cardCount = 0;
       
        return (

            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container ">
                    <h1>List of Jobs</h1>
                    <div>
                    <span>
                        <Icon name='filter' />
                            Filter: <Dropdown placeholder='Choose Filter' inline options={filterOptions} onChange={this.filterChangeHandler}/>
                    </span>
                    <span>
                        <Icon name='alternate outline calendar' />
                            Sort by Date: <Dropdown  inline options={sortOptions} defaultValue={sortOptions[0].value} onChange={this.sortChangeHandler} />
                    </span>
                    </div>
               
                <br />
                <div className="ui two cards">
                        {
                            sortedCards.map(card => {
                                {
                                    if (this.state.filter.showExpired == true && card.date < currentDate.toISOString()) {
                                        cardCount += 1;
                                        return <JobSummaryCard key={card.Id} createdOn={card.createdOn} jobTitle={card.jobTitle} location={card.location} country={card.country} date={card.date} description={card.description} />

                                    }
                                    else if (this.state.filter.showUnexpired == true && card.date > currentDate.toISOString()) {
                                        cardCount += 1;
                                        return <JobSummaryCard key={card.Id} createdOn={card.createdOn} jobTitle={card.jobTitle} location={card.location} country={card.country} date={card.date} description={card.description} />
                                    }

                                    else if (this.state.filter.showActive == true && card.status == 1 ) {
                                        cardCount += 1;
                                        return <JobSummaryCard key={card.Id} createdOn={card.createdOn} jobTitle={card.jobTitle} location={card.location} country={card.country} date={card.date} description={card.description} />                                     
                                    }
                                    else if (this.state.filter.showDraft == true && card.status == 0) {
                                        cardCount += 1;
                                        return <JobSummaryCard key={card.Id} createdOn={card.createdOn} jobTitle={card.jobTitle} location={card.location} country={card.country} date={card.date} description={card.description} />

                                    }
                                    else if (this.state.filter.showClosed == true && card.status == -1) {
                                        cardCount += 1;
                                        return <JobSummaryCard key={card.Id} createdOn={card.createdOn} jobTitle={card.jobTitle} location={card.location} country={card.country} date={card.date} description={card.description} />

                                    }
                                    else if (this.state.filter.showActive == false
                                        && this.state.filter.showDraft == false
                                        && this.state.filter.showClosed == false
                                        && this.state.filter.showUnexpired == false
                                        && this.state.filter.showExpired == false ) {
                                        cardCount += 1;
                                        return <JobSummaryCard key={card.Id} createdOn={card.createdOn} jobTitle={card.jobTitle} location={card.location} country={card.country} date={card.date} description={card.description} />
                                    }   
                                }
                            })
                        }
                        {
                        cardCount == 0 ? <div className="ui container"> <p>No jobs found</p></div>  : null
                        }

                    
                    </div>
                    <br />
                    <div align='right'>
                        {cardCount == 0 ? <Pagination activePage={this.state.activePage} totalPages={0} onPageChange={this.handlePageChanged} /> :
                        <Pagination activePage={this.state.activePage} totalPages={this.state.totalPages} onPageChange={this.handlePageChanged} />
                        }
                    </div>
                    <br />

                </div>
            </BodyWrapper>
        )
    }
}
