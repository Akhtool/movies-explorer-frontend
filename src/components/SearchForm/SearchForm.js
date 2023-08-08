import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
// SearchForm — форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
const SearchForm = () => {
  return (
    <section className="search-form">
      <form className="search-form__container">
        <input type="text" className="search-form__input" placeholder="Фильм" />
        <button className="search-form__button">Поиск</button>
      </form>
      <FilterCheckbox />
    </section>
  );
};

export default SearchForm;
