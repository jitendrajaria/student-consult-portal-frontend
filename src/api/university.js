import restActions from '.';

export function getUniversityByQuery({ courseName, gpa, greScore, country }) {
	return restActions.GET(`/university?courseName=${courseName}&gpa=${gpa}&greScore=${greScore}&country=${country}`);
}
