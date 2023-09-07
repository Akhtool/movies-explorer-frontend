import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
// SearchForm — форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
const SearchForm = ({
  isShort,
  value,
  getIsShort,
  handleChangeSearchValue,
  handleSearchClick,
  error,
}) => {
  return (
    <section className="search-form">
      <form className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          required
          onChange={(e) => handleChangeSearchValue(e)}
          value={value || ""}
        />
        <button
          onClick={(e) => handleSearchClick(e)}
          className="search-form__button"
        >
          Поиск
        </button>
      </form>
      <div className="search_form__error">{error ? error : null}</div>
      <FilterCheckbox isShort={isShort} getIsShort={getIsShort} />
    </section>
  );
};

export default SearchForm;
