import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
// SearchForm — форма поиска, куда пользователь будет вводить запрос.
// Обратите внимание на фильтр с чекбоксом «Только короткометражки».
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
const SearchForm = ({ isShort, value, getIsShort, setValue, handleSearchClick }) => {
  return (
    <section className="search-form">
      <form className="search-form__container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          required
          onChange={(e) => setValue(e)}
          value={value || ''}
        />
        <button onClick={(e) => handleSearchClick(e)} className="search-form__button">Поиск</button>
      </form>
      <FilterCheckbox isShort={isShort} getIsShort={getIsShort} />
    </section>
  );
};

export default SearchForm;
