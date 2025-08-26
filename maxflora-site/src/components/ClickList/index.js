import { clickListStyle, boxStyle } from '../../utils/styles'
import { useNavigate } from 'react-router-dom'

const Box = (value, children) => {
    return (
	// see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container
        <div style={boxStyle}>
            {value}
            <div style={{ marginLeft: 'auto' }}>
                {children !== undefined ? children(value) : null}
            </div>
        </div>
    );
};

const ClickList = ({ active, list, item, path, id, styles, onClickItem, boxChildren }) => {
    // active: what index is active
    // list: the list of clicklist items
    // item: what goes in each clicklist item
    // path: if defined, navigate to path/list[i][id] on click
    // id: target of path navigation
    // styles: 
    // onClickItem: if path not defined, run this on click
    // boxChildren: 
    const navigate = useNavigate()
    return list.map((value, index) => {
        let style = styles ? (Array.isArray(styles) ? styles[index] : styles) : clickListStyle
        style = JSON.parse(JSON.stringify(style));
        style.cursor = 'pointer'
        return (
            <div key={index} style={style} onClick={(e) => {
                e.stopPropagation()
                if (path) {
                    let key = id ? value[id] : value
                    if (active !== index) navigate(path + '/' + encodeURIComponent(key))
                    else navigate(path)
                } else if (onClickItem !== undefined) {
                    onClickItem(value, index)
                }
            }}>
                {item ? item(value, active === index) : Box(value, boxChildren)}
            </div>
        )
    })
}

export default ClickList
