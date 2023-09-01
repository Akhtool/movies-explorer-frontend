import "./FilterCheckbox.css";

const FilterCheckbox = ({ getIsShort, isShort }) => {
  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__container">
        <input value={isShort} type="checkbox" onChange={(e) => getIsShort(e)} className="filter-checkbox__input filter-checkbox__active" />
        <span className="filter-checkbox__text">Короткометражки</span>
      </div>
    </div>
  );
};

export default FilterCheckbox;
