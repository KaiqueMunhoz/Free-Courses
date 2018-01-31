import snakeCase from 'lodash.snakecase';
import { FETCH_CATEGORIES, FILTER_CATEGORIES, FETCH_COURSES } from './actions_types';
import categories from './../data/categories.json';
import courses from './../data/courses.json';

courses.forEach((course) => {
  course.id = snakeCase(course.title + course.author);
  if (typeof course.categories === 'string') { course.categories = course.categories.replace(/ *, */g, ',').split(','); }
  if (typeof course.flags === 'string') { course.flags = course.flags.split(','); }
});

const reversedCourses = courses.slice(0).reverse();
categories.sort((a, b) => (a.title < b.title ? -1 : 1));

export function fetchCategories() {
  return {
    payload: categories,
    type: FETCH_CATEGORIES
  };
}

export function filterCategory(value) {
  const filteredCategories =
    categories.filter(category => category.title.toLowerCase().match(value.toLowerCase()));

  return {
    payload: filteredCategories,
    type: FILTER_CATEGORIES
  };
}

export function fetchCourses() {
  return {
    type: FETCH_COURSES,
    payload: reversedCourses
  };
}
