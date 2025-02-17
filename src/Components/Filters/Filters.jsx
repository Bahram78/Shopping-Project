import { useContext, useEffect } from "react";
import Styles from "../Filters/Filters.module.css";
import { Contexts } from "../../App";
import Slider from "react-slider";

const Filters = () => {
  const {
    serachValue,
    setSearchValue,
    productsData,
    setRangeValue,
    rangeValue,
    MinPriceref,
    MaxPriceref,
    checkedCategories,
    setCheckedCategories,
    setFiltered,
  } = useContext(Contexts);

  const Categ = [...new Set(productsData.map((product) => product.category))];
  // console.log(Categ);

  // تغییر وضعیت هر چک‌باکس
  // const handleCheckboxChange = (category) => {
  //   setCheckedCategories({ [category]: !checkedCategories[category] });
  // };
  const handleCheckboxChange = (category) => {
    setCheckedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    })); //تمرین شود
  };

  const filterHandler = (e) => {
    e.preventDefault();
    const activeCategories = Object.keys(checkedCategories).filter(
      (category) => checkedCategories[category]
    );

    setFiltered({
      search: serachValue,
      range: rangeValue,
      categories: activeCategories,
      isFiltered: true,
    });
  };

 

  // const [handleValue, setHandleValue] = useState([0, 500]);
  // useEffect(() => {
  //   console.log(handleValue);
  // }, [handleValue]);
  // console.log(MaxPriceref.current);
  // console.log(MinPriceref.current);

  useEffect(() => {
    if (productsData.length > 0) {
      // MinPriceref.current = Math.min(
      //   ...productsData.map((product) => product.price)
      // );
      MaxPriceref.current = Math.max(
        ...productsData.map((product) => product.price)
      );
    }
    setRangeValue([0, MaxPriceref.current]);
  }, [productsData]);

  // useEffect(() => {
  //   console.log("sss",checkedCategories);
  // }, [checkedCategories]);
  // console.log(rangeValue[0], rangeValue[1]);
  return (
    <>
      <form className={Styles.container}>
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={serachValue}
          placeholder="Search"
        />
        {Categ.map((Categ, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                id={index}
                checked={!!checkedCategories[Categ]} // نکته دارد
                onChange={() => handleCheckboxChange(Categ)}
              />
              <label htmlFor={index}>{Categ}</label>
            </div>
          );
        })}
        <Slider
          className="horizontal-slider"
          thumbClassName="thumb"
          trackClassName="track"
          // defaultValue={[Min, Max]}
          ariaLabel={["Lower thumb", "Upper thumb"]}
          onChange={setRangeValue}
          value={rangeValue}
          // ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          pearling //باعث هول دادن هندل ها میشه
          minDistance={10} //حداقل فاصله بین هندل هارو تعیین میکنه
          min={0} // مقدار کمینه از داده‌ها
          max={1000} // مقدار بیشینه از داده‌ها
        />

        <div>
          <h3>{`Min:${Math.round(rangeValue[0])}`}</h3>
          <h3>{`Max:${Math.round(rangeValue[1])}`}</h3>
        </div>

        <button onClick={filterHandler}>Search</button>
      </form>
    </>
  );
};

export default Filters;
