<form method="POST" action="/prehistoric_creatures/<%=creatureId%>/?_method=PUT">
    <label>Type</label>
    <input type="text" name="type" value="<%= creature.type %>">
    <label>Img URL</label>
    <input type="text" name="img_url" value="<%= creature.img_url %>">
    <input type="submit">
</form>