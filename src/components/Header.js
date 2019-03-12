import React from 'react';

// Для создания компонента достаточно создать обычную функцию, которая вернет содержимое компонента, но при условии, что в этом компоненте не будут задействованы другие этапы цикла жизни компонента кроме render().

const Header = (props) => (
    <header className="top">
    <h1>
      Catch 
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      day
    </h1>
    <h3 className="tagline">
    <span>
      {props.tagline}
    </span>
  </h3>
  </header>
  );

// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch 
//           <span className="ofThe">
//             <span className="of">of</span>
//             <span className="the">the</span>
//           </span>
//           day
//         </h1>
//         <h3 className="tagline">
//         <span>
//           {this.props.tagline}
//         </span>
//       </h3>
//       </header>
//     )
//   }
// }

export default Header;