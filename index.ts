/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2025 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { getCurrentChannel, insertTextIntoChatInputBox } from "@utils/discord.jsx";
import definePlugin from "@utils/types";
import { ExpressionPickerStore } from "@webpack/common";

import { get_raw_gif } from "./RawFetcher.js";
type GifResult = [
    {
        url: string;
        src: string;
        gifSrc: string;
    }
];

export default definePlugin({
    name: "No Tenor Gif Tags",
    description: "It saves yourself from a ban, as it strips gif links with potentially sensitive words.",
    authors: [{
        name: "venv", id: 592358085331517460n
    }],
    patches: [{
        find: '"handleSelectGIF",',
        replacement: {
            match: /"handleSelectGIF",(\i)=>\{/,
            replace: '"handleSelectGIF",$1=>{if (!this.props.className) return $self.handleSelect($1);'
        }
    }],
    handleSelect(gif?: { url: string; }) {
        if (gif) {

            const channel = getCurrentChannel()?.id;
            if (!channel) {
                return;
            }
            if (!gif.url.match("tenor.com")) {
                insertTextIntoChatInputBox(gif.url);
                ExpressionPickerStore.closeExpressionPicker();
                return;
            }
            const fixed_gif_url = get_raw_gif(gif.url);
            if (!fixed_gif_url) {
                return;
            }
            insertTextIntoChatInputBox(fixed_gif_url);
            ExpressionPickerStore.closeExpressionPicker();

        }
    }
});

// patches: [{
//     find: "getResultItems(){",
//     replacement: {
//         match: /(getResultItems\(\)\{return) (.)/,
//         replace: "getResultItems(){return $self.handleResult($2)"
//     }
// }],
// handleResult(something: GifResult) {
//     something.forEach(function (value) {
//         const raw_gif_url = get_raw_gif(value.url);
//         if (!raw_gif_url) {
//             return;
//         }
//         value.url = raw_gif_url;
//         //  value.url = raw_gif_url;
//         //  value.gifSrc = raw_gif_url;
//         // value.src
//     });
//     console.log(something);
//     return something;
// }
