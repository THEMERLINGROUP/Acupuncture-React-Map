import * as React from 'react'
import {Component} from 'react'

export default class Acupuncture extends Component {
    render() {
        const {info} = this.props
        const displayName = `${info.name}`
        const displayPhone = `${info.phone}`
        const displayLink = `${info.link}`

        return(
            <div>
                <div>
                    {displayName} | {displayPhone}
                </div>
                <div>
                    <a href={displayLink} target = "_blank">Website</a>
                </div>
            </div>
        )
    }
}