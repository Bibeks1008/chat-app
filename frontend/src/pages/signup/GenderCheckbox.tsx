type GenderCheckboxProp = {
  onCheckboxChange: (gender: string) => void;
  selectedGender: string;
};

const GenderCheckbox = (props: GenderCheckboxProp) => {
  const { onCheckboxChange, selectedGender } = props;
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer  ${
            selectedGender === "male" ? "selected" : ""
          } `}
        >
          <span className="label-text text-stone-50">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer  ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-stone-50">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
