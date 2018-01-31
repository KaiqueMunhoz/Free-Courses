import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DevIcon from './../../components/Icons/dev-icon';
import './index.scss';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import CourseList from './course-list';
import BackButton from './../../components/BackButton';
import { fetchCourses } from '../../actions/index';
import categories from './../../data/categories.json';

const renderContribute = category => (
  <div style={{ textAlign: 'center' }}>
    <p>
      <b style={{ fontSize: '20px' }}>Sorry!</b>
      <br />
      <br />
      We do not have any listed course about {category.title}, yet.
      <br />
      If you have any suggestion and would like to collaborate, please
      <a
        href="https://github.com/Leocardoso94/Free-Courses"
        target="_blank"
      >check How
      </a>
    </p>
  </div>
);


class Category extends Component {
  componentWillMount() {
    this.props.fetchCourses();
  }
  render() {

    const categoryName = this.props.match.params.category.trim();
    let coursesInCategory = [];
    let category = {};

    if (categoryName === 'all') {
      coursesInCategory = this.props.courses;
      category = { title: 'All Courses', icon: 'devicons devicons-code_badge' };
    } else {
      if (categories.some(ctg => ctg.title.toLowerCase() === categoryName.toLowerCase())) {
        category = categories
          .find(ctg =>
            ctg.title.toLowerCase() === categoryName.toLowerCase());
      } else {
        category = { title: categoryName, icon: 'devicons devicons-code_badge' };
      }

      coursesInCategory = this.props.courses
        .filter(course => course.categories
          .some(categoryOfCourse => categoryOfCourse.toLowerCase() === category.title.toLowerCase()));
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="initial"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
        id="category"
        component="div"
        className="category"
      >
        <BackButton />
        <h1 className="title"> <DevIcon icon={category.icon} /> {category.title}</h1>
        {
          coursesInCategory.length === 0
            ? renderContribute(category)
            : <CourseList coursesInCategory={coursesInCategory} />
        }
        <div className="footer" >
          <p>
            Caught a mistake or want to add more courses about {category.title}?
            <a
              href="https://github.com/Leocardoso94/Free-Courses"
              target="_blank"
            >Check How
          </a>
          </p>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}


function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}


export default connect(mapStateToProps, { fetchCourses })(Category);

Category.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
  courses: PropTypes.arrayOf(Object).isRequired,
  fetchCourses: PropTypes.func.isRequired
};
