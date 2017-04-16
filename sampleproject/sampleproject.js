var makeCell = function(text) {
    return $("<td>").append(text);
}

var makeRow = function(text) {
    return $("<tr>").append(text);
}

var findUser = function(users, id) {
    for (let user of users) {
        if (user.id == id) return user;
    }
    return id;
}

var getDepth = function(obj) {
    if (typeof obj != "object") {
        return 0;
    }

    var depth = 0;
    for (let a in obj) {
        var aDepth = getDepth(obj[a]);

        if (aDepth > depth) {
            depth = aDepth;
        }
    }

    return depth + 1;
}

var populateTable = function(users, table) {
    users.sort((a,b) => a.name > b.name);

    users.forEach(function(user) {
        var row = $("<tr>"),
            link = "<a href=\"/user.html?" + user.id + "\">" + user.name + "</a>",
            address = user.address.street + ", " + user.address.suite + "<br/>" + user.address.city + ", " + user.address.zipcode;
        row.append(makeCell(link), makeCell(user.username), makeCell(user.email), makeCell(address));
        table.append(row);
    });
}

var getRowString = function(name, obj, maxDepth, level) {
    var depth = getDepth(obj),
        rows = [];
    if (depth == 0) {
        rows.push("<td colspan='" + (maxDepth - level) + "'>" + name + "</td><td>" + obj + "</td>");
    } else {
        var rowspan = 0;
        for (let i in obj) {
            var partialRows = getRowString(i, obj[i], maxDepth, level + 1);
            rowspan += partialRows.length;
            rows = rows.concat(partialRows);
        }
        rows[0] = "<td rowspan='" + rowspan + "'>" + name + "</td>" + rows[0];
    }
    return rows;
}

var displayUser = function(user, userInfo) {
    if (user == null) {
        userInfo.append(makeRow(makeCell("No user selected")));
    } else if (typeof user != "object") {
        userInfo.append(makeRow(makeCell("User with id " + user + " doesn't exist")));
    } else {
        var maxDepth = getDepth(user);
        for (let i in user) {
            var allRows = getRowString(i, user[i], maxDepth, 0).map(row => "<tr>" + row + "</tr>"),
                allRowsString = allRows.reduce((a,b) => a + b);
            userInfo.append($(getRowString(i, user[i], maxDepth, 0).map(row => "<tr>" + row + "</tr>").reduce((a,b) => a + b)));
        }
    }
}
