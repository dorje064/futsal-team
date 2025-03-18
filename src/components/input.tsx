
export const TextInput = ({ value, onChange }: any) => {
  return (
    <div className="input-group">
      <span className="input-group-text" id="basic-addon1">X</span>
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
};

export const SkillInput = ({ onSkillSelect, selectedSkill }: any) => {
  return (
    <div className="btn-group mx-4" role="group">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() => onSkillSelect(num)}
          type="button"
          className="btn btn-outline-secondary"
        >
          {num}
        </button>
      ))}
    </div>
  )
  // return (
  //   <div className="btn-group mx-4" role="group" >
  //     <button type="button" className="btn btn-outline-secondary">1</button>
  //     <button type="button" className="btn btn-outline-secondary">2</button>
  //     <button type="button" className="btn btn-outline-secondary">3</button>
  //     <button type="button" className="btn btn-outline-secondary">4</button>
  //     <button type="button" className="btn btn-outline-secondary">5</button>
  //   </div>
  // )
}

